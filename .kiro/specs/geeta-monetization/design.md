# Design Document: Geeta Monetization

## Overview

This document describes the technical design for transforming "Geeta in Modern World" from a screen-state-machine SPA into a URL-routed, monetized digital product. The work spans five phases: routing/bug fixes, authentication and payments, UX enhancements, visual polish, and analytics.

The existing codebase is a React + TypeScript + Vite app deployed to GitHub Pages at `https://deepak-maurya9977.github.io/geeta-modern-world/`. It uses a `language → home → geeta` state machine in `App.tsx`, Lenis smooth scroll, GSAP animations, Tailwind CSS, and a bilingual (EN/HI) chapter data layer. The `Chapter` interface and `chapters[]` / `chaptersHi[]` arrays are preserved unchanged throughout.

### Key Design Decisions

- **React Router v6** with `basename="/geeta-modern-world"` replaces the state machine. All existing component logic is preserved; only navigation wiring changes.
- **Firebase Auth** is chosen over Supabase for its first-class Google OAuth popup support and generous free tier, which suits a solo-developer product.
- **Stripe Checkout (hosted)** is used rather than Stripe Elements to avoid PCI scope on the client. A lightweight serverless backend (Vercel Edge Functions or Netlify Functions) handles webhook verification.
- **Content gating** is a pure TypeScript module with no external dependencies, making it fully unit-testable.
- **react-helmet-async** handles SEO meta injection; it is already compatible with React 18 concurrent mode.

---

## Architecture

The application follows a layered architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    React Router v6                       │
│  basename="/geeta-modern-world"                         │
│  / → LanguageSelector                                   │
│  /home → HomeScreen                                     │
│  /chapters → ChaptersGrid                               │
│  /read/:chapterId → EbookReader (ProtectedRoute)        │
│  /login → LoginPage                                     │
│  /signup → SignupPage                                   │
│  /pricing → PricingPage                                 │
│  /dashboard → AdminDashboard (ProtectedRoute, admin)    │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
  ┌──────────┐  ┌──────────────┐  ┌──────────────┐
  │ Language │  │  AuthContext │  │ ContentGating│
  │ Context  │  │ (Firebase)   │  │   Module     │
  └──────────┘  └──────┬───────┘  └──────────────┘
                       │
              ┌────────┴────────┐
              ▼                 ▼
        ┌──────────┐    ┌──────────────┐
        │ Firebase │    │    Stripe    │
        │   Auth   │    │  Checkout   │
        └──────────┘    └──────────────┘
```

### Data Flow for Content Access

```
User navigates to /read/:chapterId
        │
        ▼
ProtectedRoute checks:
  isChapterFree(chapterId)?
    YES → render EbookReader
    NO  → user authenticated?
            NO  → redirect /login
            YES → canAccessChapter(chapterId, user)?
                    YES → render EbookReader
                    NO  → render GatedContentOverlay
```

---

## Components and Interfaces

### Phase 1: Routing

**`src/main.tsx`** — Wrap the app in `BrowserRouter` with `basename`:

```tsx
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter basename="/geeta-modern-world">
            <App />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </HelmetProvider>
  </StrictMode>
);
```

**`src/App.tsx`** — Replace the state machine with `<Routes>`. All route components are `React.lazy`-loaded:

```tsx
const LanguageSelector = lazy(() => import('./components/LanguageSelector'));
const HomeScreen       = lazy(() => import('./components/HomeScreen'));
const ChaptersGrid     = lazy(() => import('./components/ChaptersGrid'));
const EbookReader      = lazy(() => import('./components/EbookReader'));
const LoginPage        = lazy(() => import('./pages/LoginPage'));
const SignupPage       = lazy(() => import('./pages/SignupPage'));
const PricingPage      = lazy(() => import('./pages/PricingPage'));
const AdminDashboard   = lazy(() => import('./pages/AdminDashboard'));
```

Route guards:
- `/read/:chapterId` is wrapped in `<ProtectedRoute>` which checks `canAccessChapter`.
- Unknown paths fall through to a `<Navigate to="/" replace />` catch-all.
- Direct navigation to `/read/:chapterId` without a saved language preference redirects to `/`.

### Phase 1: ScrollStory Hook

**`src/hooks/use-scroll-story.ts`**

```ts
interface UseScrollStoryOptions {
  sectionRefs?: React.RefObject<HTMLElement>[];
}

interface UseScrollStoryReturn {
  scrollProgress: number;          // [0, 1]
  activeSection: number;           // index into sectionRefs
  scrollTo: (target: HTMLElement | number, options?: LenisScrollToOptions) => void;
}

export function useScrollStory(options?: UseScrollStoryOptions): UseScrollStoryReturn
```

- Creates a single Lenis instance (`duration: 1.2`, `smoothWheel: true`) on mount.
- Checks `window.matchMedia('(prefers-reduced-motion: reduce)')` before initialising Lenis; if reduced motion, falls back to native scroll.
- Tracks `scrollProgress` via `lenis.on('scroll', ...)` and `requestAnimationFrame`.
- Computes `activeSection` by comparing each section ref's `getBoundingClientRect().top` to `window.innerHeight / 2`.
- Cleans up Lenis instance and cancels RAF on unmount.

### Phase 1: Image Utilities

**`src/utils/images.ts`**

```ts
const CHAPTER_IMAGES: Record<number, string> = {
  1:  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80',
  2:  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  // ... all 18 chapters
};

const PHASE_GRADIENTS: Record<Chapter['phase'], string> = {
  Foundation:  'linear-gradient(135deg, #D6A23A 0%, #8B5E1A 100%)',
  Devotion:    'linear-gradient(135deg, #7C6BC9 0%, #4A3580 100%)',
  Integration: 'linear-gradient(135deg, #4A90A4 0%, #2C5F6E 100%)',
};

export function getChapterImageUrl(chapterId: number): string
export function getChapterGradient(phase: Chapter['phase']): string
```

No component references `/ch*.jpg` local paths in the web build. The Capacitor build uses a separate asset resolution path via `capacitor.config.json`.

### Phase 2: Authentication

**`src/lib/auth-context.tsx`**

```ts
interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isPremium: boolean;           // derived from Firestore user doc
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
}
```

- `isPremium` is read from a Firestore document at `users/{uid}/subscription.status === 'active'`.
- On auth state change, the context fetches the Firestore doc and merges `isPremium` into the user object.
- Errors from Firebase are mapped to generic messages (never exposing whether email or password was wrong).

**`src/components/ProtectedRoute.tsx`**

```tsx
interface ProtectedRouteProps {
  children: ReactNode;
  requirePremium?: boolean;
  chapterId?: number;
}
```

- If `!user` and route requires auth → redirect to `/login` with `{ state: { from: location } }`.
- If `user` but `!canAccessChapter(chapterId, user)` → render `<GatedContentOverlay>` inside the reader.

### Phase 2: Content Gating

**`src/lib/content-gating.ts`**

```ts
export function isChapterFree(chapterId: number): boolean {
  return chapterId >= 1 && chapterId <= 3;
}

export function canAccessChapter(chapterId: number, user: AuthUser | null): boolean {
  if (isChapterFree(chapterId)) return true;
  return user !== null && user.isPremium === true;
}
```

This module is the single source of truth. No component hardcodes chapter access rules.

**`src/components/GatedContentOverlay.tsx`**

Renders over the EbookReader when `canAccessChapter` returns false:
- Blurred preview of the chapter title page behind the overlay.
- "Unlock Premium" CTA linking to `/pricing`.
- Displays chapter title and a brief teaser.

### Phase 2: Payments

**`src/pages/PricingPage.tsx`** — Three-column layout:
- Free tier: Chapters 1–3
- One-Time $49 lifetime access
- Subscription $4.99/month or $39.99/year
- Per-Chapter $4.99

**`src/components/CheckoutModal.tsx`** — Opens a Stripe Checkout session:

```ts
async function initiateCheckout(priceId: string, userId: string): Promise<void>
```

- Calls a serverless function (`/api/create-checkout-session`) with `priceId` and `userId`.
- Redirects to Stripe-hosted checkout page.
- On return, Stripe redirects to `/pricing?success=true` or `/pricing?cancelled=true`.

**Serverless backend** (`api/create-checkout-session.ts`, `api/stripe-webhook.ts`):
- `create-checkout-session`: Creates a Stripe Checkout session with `success_url` and `cancel_url`.
- `stripe-webhook`: Verifies Stripe signature, handles `checkout.session.completed`, writes `subscription.status = 'active'` to Firestore.

### Phase 3: UX Enhancements

**HomeScreen redesign** — New sections added to `HomeScreen.tsx`:
- Hero with animated headline and CTA
- Value props grid (4 cards)
- Chapter preview carousel (first 3 chapters)
- Pricing section (condensed)
- Testimonials (3 cards)
- Coming soon with email waitlist form

**Email capture** — `src/components/EmailCapture.tsx`:
- Footer form + exit-intent popup (triggered on `mouseleave` from document)
- Lead magnet: Chapter 1 PDF download
- Sends to Resend API via serverless function

**Social sharing** — `src/components/ShareButtons.tsx`:
- Shown on chapter-end page in EbookReader
- Quote card generation using `html2canvas`
- Pre-filled tweet template with chapter title and URL

### Phase 4: Visual Enhancements

**Dark mode** — `src/lib/theme-context.tsx`:
```ts
type Theme = 'light' | 'dark' | 'system';
interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}
```
- Auto-detects via `prefers-color-scheme`.
- Persists to `localStorage` under key `geeta-theme`.
- Dark palette: deep brown `#1A0F08` / navy `#0B0F17` + warm gold `#D6A23A`.

**EbookReader reader settings** — `src/components/ReaderSettings.tsx`:
- Font size: `small` (14px) / `medium` (16px) / `large` (18px)
- Font family: `serif` (Playfair Display) / `sans-serif` (Inter)
- Persisted to `localStorage` under `geeta-reader-settings`.

**Animations** — `framer-motion` for page transitions; skeleton loaders for chapter cards and reader pages.

### Phase 5: Analytics

**`src/lib/analytics.ts`**:
```ts
export function trackEvent(name: string, properties?: Record<string, string | number>): void
export function trackChapterStarted(chapterId: number): void
export function trackChapterCompleted(chapterId: number): void
export function trackCTAClick(ctaName: string, location: string): void
export function trackCheckoutStarted(planId: string): void
```

Wraps either GA4 (`gtag`) or Plausible depending on `VITE_ANALYTICS_PROVIDER` env var.

**`src/pages/AdminDashboard.tsx`** — Protected route (admin-only):
- DAU/WAU/MAU charts
- Revenue metrics
- Chapter popularity bar chart
- Conversion funnel (visit → signup → checkout → purchase)
- A/B test variant assignment and result display

---

## Data Models

### Firestore Schema

```
users/
  {uid}/
    email: string
    displayName: string
    createdAt: Timestamp
    subscription/
      status: 'active' | 'inactive' | 'cancelled'
      stripeCustomerId: string
      stripePriceId: string
      currentPeriodEnd: Timestamp
      plan: 'lifetime' | 'monthly' | 'yearly' | 'per-chapter'
    chapterAccess/
      {chapterId}: true   // for per-chapter purchases

analytics/
  events/
    {eventId}/
      userId: string | null
      event: string
      properties: Record<string, string | number>
      timestamp: Timestamp
      sessionId: string
```

### Reader Settings (localStorage)

```ts
interface ReaderSettings {
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'serif' | 'sans-serif';
}
// key: 'geeta-reader-settings'
```

### A/B Test Assignment (localStorage)

```ts
interface ABTestAssignment {
  pricingDisplay: 'A' | 'B';
  ctaText: 'A' | 'B';
  freeDepth: 'A' | 'B';
}
// key: 'geeta-ab-assignments'
```

### Existing Chapter Interface (unchanged)

```ts
// src/data/chapters.ts — DO NOT MODIFY
export interface Chapter {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  phase: 'Foundation' | 'Devotion' | 'Integration';
  story: Story;
  summary: string;
  shlokas: Shloka[];
  keyTeaching: string;
  modernContext: string;
  bgImage: string;
  practicalTakeaway: string;
  reflectionQuestions: string[];
  tryThis: string;
  glossaryTerms: GlossaryTerm[];
  readingTimeMinutes: number;
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Language selection persists and routes correctly

*For any* valid language value (`'en'` or `'hi'`), selecting that language should navigate to `/home` and `localStorage.getItem('geeta-lang')` should return that same language value.

**Validates: Requirements 1.3**

---

### Property 2: Chapter navigation routes to correct URL

*For any* chapter ID in the range [1, 18], opening that chapter should result in the browser URL being `/read/{chapterId}`.

**Validates: Requirements 1.5**

---

### Property 3: Unknown paths redirect to root

*For any* path string that does not match a defined route, the router should redirect to `/`.

**Validates: Requirements 1.8**

---

### Property 4: Direct navigation without language preference redirects

*For any* chapter ID in [1, 18], navigating directly to `/read/{chapterId}` without a saved language preference in `localStorage` should redirect to `/`.

**Validates: Requirements 1.7**

---

### Property 5: Scroll progress is always in range

*For any* scroll position value (including 0, maximum, and values in between), `scrollProgress` returned by `useScrollStory` should be a number in the closed interval [0, 1].

**Validates: Requirements 2.3**

---

### Property 6: Active section tracks nearest section to viewport midpoint

*For any* array of section positions and any scroll position, `activeSection` should be the index of the section whose top edge is nearest to `window.innerHeight / 2`.

**Validates: Requirements 2.5**

---

### Property 7: Chapter image mapper covers all chapter IDs

*For any* chapter ID in [1, 18], `getChapterImageUrl(id)` should return a non-empty string that starts with `https://`.

**Validates: Requirements 3.1**

---

### Property 8: SEO meta description length constraint

*For any* route in the application, the injected `<meta name="description">` content should have a length of at most 160 characters.

**Validates: Requirements 4.2**

---

### Property 9: Open Graph tags present on all routes

*For any* route rendered by the application, the document head should contain non-empty `og:title`, `og:description`, `og:image`, and `og:url` meta tags.

**Validates: Requirements 4.3**

---

### Property 10: Swipe threshold gates page navigation

*For any* touch swipe gesture, a page turn should occur if and only if the horizontal swipe distance is ≥ 50 px.

**Validates: Requirements 5.3**

---

### Property 11: AuthContext exposes all required values

*For any* component consuming `AuthContext`, the context value should contain non-undefined `user`, `loading`, `signInWithEmail`, `signUpWithEmail`, `signInWithGoogle`, `signOut`, and `sendPasswordReset`.

**Validates: Requirements 6.1**

---

### Property 12: Email validation rejects non-email strings

*For any* string that does not match a valid email format (e.g., missing `@`, missing domain), submitting the login form should display an inline validation error without calling the Firebase auth backend.

**Validates: Requirements 6.3**

---

### Property 13: ProtectedRoute redirects unauthenticated users for gated chapters

*For any* chapter ID in [4, 18], an unauthenticated user navigating to `/read/{chapterId}` should be redirected to `/login` with the intended path stored in `location.state.from`.

**Validates: Requirements 6.8**

---

### Property 14: Post-login redirect returns to intended path

*For any* intended path stored in `location.state.from`, a successful sign-in should navigate the user to that exact path.

**Validates: Requirements 6.9**

---

### Property 15: Unauthenticated checkout redirects to login with purchase intent

*For any* unauthenticated user clicking a checkout CTA, the app should redirect to `/login` and preserve the purchase intent (plan ID) in session state.

**Validates: Requirements 7.7**

---

### Property 16: isChapterFree returns correct boolean for all chapter IDs

*For any* chapter ID in [1, 18], `isChapterFree(id)` should return `true` if and only if `id <= 3`.

**Validates: Requirements 8.1**

---

### Property 17: canAccessChapter enforces tier logic for all inputs

*For any* chapter ID in [1, 18] and any user state (null, authenticated non-premium, authenticated premium), `canAccessChapter(chapterId, user)` should return `true` if and only if `isChapterFree(chapterId)` is true OR the user is non-null with `isPremium === true`.

**Validates: Requirements 8.2**

---

### Property 18: Gated chapters show paywall overlay for non-premium users

*For any* chapter ID in [4, 18] rendered for a non-premium user (or unauthenticated user), the EbookReader should render `GatedContentOverlay` instead of chapter content.

**Validates: Requirements 8.3**

---

### Property 19: Premium chapter cards show lock indicators for non-premium users

*For any* chapter ID in [4, 18] rendered in ChaptersGrid for a non-premium user, the chapter card should contain a lock icon and a "Premium" badge.

**Validates: Requirements 8.4**

---

### Property 20: Premium users see no lock indicators on any chapter card

*For any* chapter ID in [1, 18] rendered in ChaptersGrid for an authenticated premium user, the chapter card should not contain a lock icon or "Premium" badge.

**Validates: Requirements 8.5**

---

### Property 21: Subscription status change reactively updates access

*For any* user whose `isPremium` value changes from `false` to `true`, `canAccessChapter` should immediately return `true` for previously gated chapters without requiring a page reload.

**Validates: Requirements 8.7**

---

## Error Handling

### Authentication Errors

| Firebase Error Code | User-Facing Message |
|---|---|
| `auth/wrong-password` | "Invalid email or password." |
| `auth/user-not-found` | "Invalid email or password." |
| `auth/email-already-in-use` | "An account with this email already exists." |
| `auth/weak-password` | "Password must be at least 6 characters." |
| `auth/network-request-failed` | "Network error. Please check your connection." |
| Any other | "Something went wrong. Please try again." |

Error messages never reveal whether the email or password was the incorrect field.

### Stripe Errors

- Network failure calling `/api/create-checkout-session`: Show inline error with retry button; do not lose the user's session.
- Webhook signature verification failure: Return HTTP 400; log to server; do not update Firestore.
- Checkout session expired: Redirect to `/pricing` with a toast notification.

### Image Loading Errors

- `onError` handler on every `<img>` element sets `src` to `''` and applies the CSS gradient fallback via inline style.
- Skeleton placeholder shown during load via `onLoadStart` / `onLoad` state toggle.

### Routing Errors

- Unknown paths: `<Navigate to="/" replace />` catch-all.
- Direct navigation to `/read/:chapterId` with invalid (non-integer or out-of-range) `chapterId`: Redirect to `/chapters`.
- `React.lazy` chunk load failure: `<ErrorBoundary>` wraps `<Suspense>` and shows a "Reload page" fallback.

---

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

Focus on specific examples, edge cases, and error conditions:

- `src/lib/content-gating.ts` — example-based tests for boundary values (chapter 1, 3, 4, 18) and null user.
- `src/lib/auth-context.tsx` — mock Firebase, test each auth operation and error mapping.
- `src/utils/images.ts` — verify all 18 chapter IDs return valid URLs.
- `src/components/GatedContentOverlay.tsx` — render with various chapter/user combinations.
- `src/components/ProtectedRoute.tsx` — test redirect behavior with and without auth.
- `src/pages/PricingPage.tsx` — verify INR pricing display, plan selection.

### Property-Based Tests (fast-check)

fast-check is chosen as the property-based testing library for TypeScript. Each test runs a minimum of 100 iterations.

Tag format: `// Feature: geeta-monetization, Property {N}: {property_text}`

**Content Gating Properties (Properties 16–21)**:
```ts
// Property 16: isChapterFree
fc.assert(fc.property(
  fc.integer({ min: 1, max: 18 }),
  (id) => isChapterFree(id) === (id <= 3)
), { numRuns: 100 });

// Property 17: canAccessChapter
fc.assert(fc.property(
  fc.integer({ min: 1, max: 18 }),
  fc.oneof(
    fc.constant(null),
    fc.record({ uid: fc.string(), isPremium: fc.boolean(), email: fc.option(fc.emailAddress()), displayName: fc.option(fc.string()), photoURL: fc.option(fc.string()) })
  ),
  (id, user) => {
    const expected = isChapterFree(id) || (user !== null && user.isPremium === true);
    return canAccessChapter(id, user) === expected;
  }
), { numRuns: 200 });
```

**Routing Properties (Properties 1–4)**:
- Use `MemoryRouter` from `react-router-dom` for testing.
- Generate random chapter IDs and unknown path strings with fast-check.

**Scroll Hook Properties (Properties 5–6)**:
- Mock `window.scrollY` and `document.documentElement.scrollHeight` with generated values.
- Verify `scrollProgress` is always clamped to [0, 1].

**SEO Properties (Properties 8–9)**:
- Render each route with `HelmetProvider` and verify meta tag content.

**Swipe Property (Property 10)**:
- Generate random swipe distances (positive and negative) and verify page turn occurs iff `|distance| >= 50`.

**Auth Properties (Properties 11–15)**:
- Mock Firebase auth module.
- Generate random email strings (valid and invalid) for Property 12.
- Generate random path strings for Property 14.

### Integration Tests

- Stripe webhook handler: simulate `checkout.session.completed` event with valid/invalid signatures.
- Firebase Auth: test Google OAuth flow in a Firebase emulator.
- Lighthouse audit: run on `/chapters` route in CI to verify accessibility score ≥ 90.

### Smoke Tests

- Router basename configuration.
- `/login`, `/signup`, `/pricing` routes render without crashing.
- `public/sitemap.xml` and `public/robots.txt` exist and are well-formed.
- No component references `/ch*.jpg` local paths (static grep in CI).
- `React.lazy` is used for all route components (static AST check).
