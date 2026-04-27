# Requirements Document

## Introduction

"Geeta in Modern World" is a React + TypeScript + Vite web application that retells all 18 chapters of the Bhagavad Gita through modern stories. The product is currently deployed to GitHub Pages and uses a screen-state machine (`language → home → geeta`) instead of URL-based routing. This feature transforms the application into a sellable digital product by: (1) fixing critical stability and UX bugs that prevent reliable use, and (2) adding monetization infrastructure — authentication, payments, and content gating — that enables a free/premium tier model.

---

## Glossary

- **App**: The React + TypeScript + Vite single-page application deployed at `https://deepak-maurya9977.github.io/geeta-modern-world/`.
- **Router**: React Router v6 providing URL-based navigation with a `basename` matching the GitHub Pages sub-path.
- **LanguageSelector**: The `/` route component where users choose English or Hindi before entering the app.
- **HomeScreen**: The `/home` route component displaying the teaching-card library (Geeta, Ashtavakra, Shiv Puran, Buddha).
- **ChaptersGrid**: The `/chapters` route component showing all 18 chapter cards with search.
- **EbookReader**: The `/read/:chapterId` route component rendering the paginated chapter reading experience.
- **ScrollStoryHook**: The custom React hook at `src/hooks/use-scroll-story.ts` that integrates Lenis smooth scroll, exposes scroll progress, and detects the active section.
- **ContentGating**: The module at `src/lib/content-gating.ts` that determines which chapters are accessible under the free tier and which require a premium subscription.
- **AuthContext**: The React context at `src/lib/auth-context.tsx` that exposes the current authenticated user and auth operations (sign-in, sign-up, sign-out, password reset).
- **ProtectedRoute**: A wrapper component that redirects unauthenticated users to `/login` when they attempt to access a gated route.
- **CheckoutModal**: The Stripe-powered payment UI component that initiates a checkout session for the premium tier.
- **PricingPage**: The `/pricing` route component that presents free vs. premium tier comparison and triggers checkout.
- **Free Tier**: Access to chapters 1–3 without authentication.
- **Premium Tier**: Full access to all 18 chapters, unlocked after successful payment.
- **Stripe**: The payment processor used for checkout sessions and webhook-based subscription confirmation.
- **Firebase Auth / Supabase Auth**: The authentication backend (one to be chosen during design) providing email/password and Google OAuth sign-in.
- **SEO_Manager**: The `react-helmet-async` integration that injects per-route `<title>`, `<meta>`, and Open Graph tags.
- **Unsplash_Mapper**: The utility that maps chapter IDs to curated Unsplash image URLs used as chapter background fallbacks.

---

## Requirements

### Requirement 1: URL-Based Routing

**User Story:** As a user, I want each screen to have its own URL, so that I can bookmark, share, and navigate with the browser back/forward buttons without the app crashing.

#### Acceptance Criteria

1. THE Router SHALL mount all routes under the `basename` `/geeta-modern-world` to match the GitHub Pages deployment path.
2. WHEN the App initialises, THE Router SHALL render `LanguageSelector` at the `/` path.
3. WHEN a user selects a language, THE Router SHALL navigate to `/home` and persist the language choice in `localStorage`.
4. WHEN a user selects the "Geeta in Modern World" teaching card, THE Router SHALL navigate to `/chapters`.
5. WHEN a user opens a chapter, THE Router SHALL navigate to `/read/:chapterId` where `chapterId` is the integer chapter number.
6. WHEN a user closes the EbookReader, THE Router SHALL navigate back to `/chapters`.
7. IF a user navigates directly to `/read/:chapterId` without a saved language preference, THEN THE Router SHALL redirect to `/` before rendering the reader.
8. IF a user navigates to an unknown path, THEN THE Router SHALL redirect to `/`.
9. WHEN the browser back button is pressed inside the EbookReader, THE Router SHALL navigate to `/chapters` rather than exiting the reader mid-page.

---

### Requirement 2: ScrollStory Hook

**User Story:** As a developer, I want a reusable scroll hook, so that any component can access smooth-scroll progress and active-section detection without duplicating Lenis setup.

#### Acceptance Criteria

1. THE ScrollStoryHook SHALL initialise a single Lenis instance with `duration: 1.2` and `smoothWheel: true` when first mounted.
2. WHEN `prefers-reduced-motion` is set to `reduce`, THE ScrollStoryHook SHALL disable Lenis smooth scrolling and fall back to native scroll.
3. THE ScrollStoryHook SHALL expose a `scrollProgress` value in the range `[0, 1]` representing the ratio of current scroll position to total scrollable height.
4. WHEN the scroll position changes, THE ScrollStoryHook SHALL update `scrollProgress` on every animation frame via `requestAnimationFrame`.
5. THE ScrollStoryHook SHALL accept an array of section element refs and expose an `activeSection` index indicating which section's top edge is nearest to the viewport midpoint.
6. WHEN the component using the hook unmounts, THE ScrollStoryHook SHALL destroy the Lenis instance and cancel all pending animation frames to prevent memory leaks.
7. THE ScrollStoryHook SHALL export a `scrollTo` function that accepts a target element or numeric offset and delegates to the Lenis `scrollTo` method.

---

### Requirement 3: Chapter Background Image Fallbacks

**User Story:** As a user, I want chapter cards and the reader to display visually appealing backgrounds, so that the experience does not show broken images when local assets are unavailable.

#### Acceptance Criteria

1. THE Unsplash_Mapper SHALL provide a curated Unsplash URL for each of the 18 chapter IDs, used as the primary background source.
2. WHEN an image URL fails to load, THE App SHALL display a CSS gradient fallback derived from the chapter's phase colour (`#D6A23A` for Foundation, `#7C6BC9` for Devotion, `#4A90A4` for Integration).
3. THE App SHALL not reference local paths such as `/ch1_bg.jpg` in any component rendered on the web build.
4. WHERE the Capacitor Android build is active, THE App SHALL continue to reference local asset paths from the `android/app/src/main/assets/public/` directory.
5. WHEN a chapter background image is loading, THE App SHALL display a skeleton placeholder with the gradient fallback colour to prevent layout shift.

---

### Requirement 4: SEO and Performance

**User Story:** As a product owner, I want the app to be discoverable by search engines and load quickly, so that organic traffic grows and users have a fast experience.

#### Acceptance Criteria

1. THE SEO_Manager SHALL inject a unique `<title>` tag for each route: `"Geeta in Modern World"` for `/`, `"Wisdom Library | Geeta in Modern World"` for `/home`, `"All 18 Chapters | Geeta in Modern World"` for `/chapters`, and `"Chapter {N}: {title} | Geeta in Modern World"` for `/read/:chapterId`.
2. THE SEO_Manager SHALL inject `<meta name="description">` with route-specific content not exceeding 160 characters.
3. THE SEO_Manager SHALL inject Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) on every route.
4. THE App SHALL include a `public/sitemap.xml` listing all static routes with `<lastmod>` and `<changefreq>` values.
5. THE App SHALL include a `public/robots.txt` that allows all crawlers and references the sitemap URL.
6. WHEN a route component is not the current route, THE Router SHALL code-split it using `React.lazy` and `Suspense` so that the initial bundle does not include inactive route code.
7. WHEN an image is outside the viewport, THE App SHALL apply `loading="lazy"` to defer its network request.
8. THE App SHALL add `aria-label` attributes to all interactive elements that lack visible text labels, including icon-only buttons.

---

### Requirement 5: Responsive Design

**User Story:** As a user on any device, I want the app to be fully usable at 320 px, 768 px, and 1280 px+ viewport widths, so that I can read chapters comfortably on mobile, tablet, and desktop.

#### Acceptance Criteria

1. THE EbookReader SHALL render its content area with a minimum width of 320 px without horizontal overflow.
2. WHEN the viewport width is below 768 px, THE EbookReader SHALL hide side navigation arrows and rely solely on bottom navigation buttons and swipe gestures.
3. THE EbookReader SHALL support left and right swipe gestures on touch devices to navigate between pages, with a minimum swipe distance threshold of 50 px.
4. THE ChaptersGrid SHALL render a single-column layout at 320 px, a two-column layout at 768 px, and a three-column layout at 1280 px+.
5. THE HomeScreen teaching cards SHALL stack vertically at 320 px and render in a two-column grid at 768 px+.
6. WHEN the virtual keyboard appears on mobile, THE EbookReader SHALL not shift its layout in a way that obscures the navigation controls.
7. THE App SHALL pass a Lighthouse mobile accessibility audit with a score of 90 or above on the `/chapters` route.

---

### Requirement 6: Authentication

**User Story:** As a user, I want to create an account and sign in, so that my reading progress and premium access are tied to my identity across devices.

#### Acceptance Criteria

1. THE AuthContext SHALL expose `user`, `loading`, `signInWithEmail`, `signUpWithEmail`, `signInWithGoogle`, `signOut`, and `sendPasswordReset` to all descendant components.
2. WHEN a user submits valid email and password credentials, THE AuthContext SHALL authenticate the user and update `user` to the authenticated profile within 3 seconds.
3. WHEN a user submits an invalid email format, THE App SHALL display an inline validation error before submitting to the auth backend.
4. WHEN authentication fails due to wrong credentials, THE AuthContext SHALL surface an error message that does not reveal whether the email or password was incorrect.
5. WHEN a user clicks "Sign in with Google", THE AuthContext SHALL initiate the Google OAuth popup flow and update `user` on success.
6. WHEN a user requests a password reset, THE AuthContext SHALL send a reset email to the provided address and confirm dispatch with a success message.
7. WHEN a user signs out, THE AuthContext SHALL clear the `user` state and redirect to `/`.
8. THE ProtectedRoute SHALL redirect unauthenticated users attempting to access `/read/:chapterId` for chapters 4–18 to `/login` with the intended path stored in location state.
9. WHEN an authenticated user is redirected to `/login`, THE App SHALL redirect them back to their originally intended path after successful sign-in.
10. THE App SHALL include a `/login` route rendering a sign-in form and a `/signup` route rendering a registration form.

---

### Requirement 7: Payment Integration

**User Story:** As a user, I want to purchase premium access with a credit card, so that I can unlock all 18 chapters in a single transaction.

#### Acceptance Criteria

1. THE App SHALL include a `/pricing` route rendering the PricingPage with a free-tier column and a premium-tier column.
2. WHEN an authenticated user clicks "Unlock All Chapters" on the PricingPage, THE CheckoutModal SHALL open a Stripe Checkout session for the premium product.
3. WHEN a Stripe Checkout session completes successfully, THE App SHALL receive confirmation via a server-side webhook and update the user's premium status in the auth backend within 10 seconds.
4. WHEN a Stripe Checkout session is cancelled, THE CheckoutModal SHALL close and return the user to the PricingPage without changing their access tier.
5. IF a Stripe API call fails, THEN THE App SHALL display an error message and provide a retry option without losing the user's session.
6. THE PricingPage SHALL display the price in INR as the primary currency with USD shown as secondary.
7. WHEN an unauthenticated user clicks "Unlock All Chapters", THE App SHALL redirect to `/login` before initiating checkout, preserving the intent to purchase in session state.
8. THE App SHALL not store raw Stripe payment details in the client; all sensitive operations SHALL be handled server-side.

---

### Requirement 8: Content Gating

**User Story:** As a product owner, I want chapters 1–3 to be freely accessible and chapters 4–18 to require a premium subscription, so that users can sample the product before purchasing.

#### Acceptance Criteria

1. THE ContentGating module SHALL export a `isChapterFree(chapterId: number): boolean` function that returns `true` for chapter IDs 1, 2, and 3, and `false` for IDs 4 through 18.
2. THE ContentGating module SHALL export a `canAccessChapter(chapterId: number, user: User | null): boolean` function that returns `true` when the chapter is free, or when the user is authenticated and holds an active premium subscription.
3. WHEN a user without premium access attempts to open a gated chapter, THE App SHALL display a paywall overlay within the EbookReader that presents the chapter title and a "Unlock Premium" call-to-action linking to `/pricing`.
4. THE ChaptersGrid SHALL visually distinguish free chapters (IDs 1–3) from premium chapters (IDs 4–18) using a lock icon and a "Premium" badge on gated cards.
5. WHEN a premium user is authenticated, THE ChaptersGrid SHALL not display lock icons or premium badges on any chapter card.
6. THE ContentGating module SHALL be the single source of truth for tier logic; no component SHALL hardcode chapter access rules independently.
7. WHEN the user's subscription status changes (e.g., after payment), THE ContentGating module SHALL re-evaluate access without requiring a full page reload.
