import { useEffect, useRef, useLayoutEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowRight, ArrowUp, BookOpen, ChevronDown, Heart, MessageCircle } from 'lucide-react';
import { chapters } from './data/chapters';
import EbookReader from './components/EbookReader';
import ChaptersGrid from './components/ChaptersGrid';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS_PER_BATCH = 5;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Phase config
const PHASES = [
  { name: 'Foundation', range: [1, 6], description: 'Chapters 1–6: The philosophical foundation — understanding duty, the self, and selfless action.' },
  { name: 'Devotion', range: [7, 12], description: 'Chapters 7–12: The path of devotion — divine knowledge, meditation, and surrender.' },
  { name: 'Integration', range: [13, 18], description: 'Chapters 13–18: Integration and liberation — wisdom, discernment, and freedom.' },
] as const;

function getPhaseForChapter(id: number) {
  return PHASES.find(p => id >= p.range[0] && id <= p.range[1]);
}

// Chapter Card Component
const ChapterCard = ({
  badge,
  title,
  story,
  phase,
  readingTime,
  onReadClick,
  onTitleClick,
}: {
  badge: string;
  title: string;
  story: string;
  phase?: string;
  readingTime?: number;
  onReadClick: () => void;
  onTitleClick: () => void;
}) => (
  <div className="chapter-card p-8 lg:p-10">
    <div className="flex items-center gap-3 mb-6">
      <span className="chapter-badge">{badge}</span>
      {phase && (
        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-[#D6A23A]/10 text-[#D6A23A] border border-[#D6A23A]/20">
          {phase}
        </span>
      )}
    </div>
    <h2
      className="text-3xl lg:text-4xl xl:text-5xl mb-3 text-[#14181F] cursor-pointer hover:text-[#D6A23A] transition-colors"
      onClick={onTitleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onTitleClick(); }}
    >
      {title}
    </h2>
    {readingTime && (
      <p className="text-xs text-[#6B6F78] mb-4">{readingTime} min read</p>
    )}
    <p className="text-base lg:text-lg leading-relaxed text-[#14181F]/80 mb-8 max-w-xl">
      {story}
    </p>
    <button
      onClick={onReadClick}
      className="text-link text-sm font-medium group"
      aria-label={`Read the story of ${title}`}
    >
      Read the story
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>
  </div>
);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  // (triggers managed by gsap.context — no manual tracking needed)

  // State
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [showChaptersGrid, setShowChaptersGrid] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentScrollChapter, setCurrentScrollChapter] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(CHAPTERS_PER_BATCH);

  const visibleChapters = chapters.slice(0, visibleCount);
  const hasMoreChapters = visibleCount < chapters.length;

  // Continue reading from localStorage
  const [lastReadChapter, setLastReadChapter] = useState<number | null>(() => {
    const saved = localStorage.getItem('geeta-last-read');
    return saved ? parseInt(saved, 10) : null;
  });

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ticker for perfect frame alignment
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Track scroll position for back-to-top and progress
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight);

      for (let i = visibleCount; i >= 1; i--) {
        const el = document.getElementById(`chapter-${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setCurrentScrollChapter(i);
            return;
          }
        }
      }
      setCurrentScrollChapter(0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount]);

  // Hero entrance animation on load
  useEffect(() => {
    if (prefersReduced) {
      gsap.set(heroBgRef.current, { opacity: 1, scale: 1 });
      gsap.set(heroCardRef.current, { x: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(heroBgRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', force3D: true }
      );
      gsap.fromTo(heroCardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2, force3D: true }
      );
    });

    return () => ctx.revert();
  }, []);

  // Scroll-driven animations — single timeline per section, scrub: true (1:1), no lag
  useLayoutEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero: single pinned timeline
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
        }
      });
      heroTl
        .to(heroCardRef.current, {
          y: -60, opacity: 0, scale: 0.96,
          ease: 'none', force3D: true,
        }, 0)
        .to(heroBgRef.current, {
          scale: 1.08, opacity: 0.5,
          ease: 'none', force3D: true,
        }, 0);

      // Chapter sections — single timeline per chapter
      visibleChapters.forEach((chapter) => {
        const sectionId = `#chapter-${chapter.id}`;
        const card = document.querySelector(`${sectionId} .chapter-card`) as HTMLElement;
        const bg = document.querySelector(`${sectionId} .bg-wrapper`) as HTMLElement;

        if (!card || !bg) return;

        // Promote to GPU layer
        gsap.set(card, { force3D: true });
        gsap.set(bg, { force3D: true });

        // Background is ALWAYS fully opaque — no fade-in that exposes the section beneath
        gsap.set(bg, { opacity: 1, scale: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionId,
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
          }
        });

        // Card: start visible, hold, then exit upward in last 30%
        // Card starts at y:0 opacity:1 (already visible when section pins)
        gsap.set(card, { y: 0, opacity: 1, scale: 1 });

        // 0 → 0.7: Card is fully visible (user reads)
        // 0.7 → 1.0: Card fades up and out
        tl.to(card,
          { y: -50, opacity: 0, ease: 'power2.in', duration: 0.3 },
          0.7
        );

        // Background: subtle Ken Burns zoom over the full timeline, stays fully opaque
        tl.fromTo(bg,
          { scale: 1.02 },
          { scale: 1, ease: 'none', duration: 1 },
          0
        );
      });

      // Closing section reveal
      gsap.fromTo('#closing-content',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'power2.out', force3D: true,
          scrollTrigger: {
            trigger: '#closing-section',
            start: 'top 80%',
            end: 'top 35%',
            scrub: true,
          }
        }
      );
    }, mainRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [visibleCount]);

  const openReader = useCallback((chapterId: number) => {
    setActiveChapterId(chapterId);
    setShowChaptersGrid(false);
    setLastReadChapter(chapterId);
    localStorage.setItem('geeta-last-read', String(chapterId));
    document.body.style.overflow = 'hidden';
  }, []);

  const closeReader = useCallback(() => {
    setActiveChapterId(null);
    document.body.style.overflow = '';
  }, []);

  const goToNextChapter = useCallback(() => {
    if (activeChapterId && activeChapterId < chapters.length) {
      const next = activeChapterId + 1;
      setActiveChapterId(next);
      setLastReadChapter(next);
      localStorage.setItem('geeta-last-read', String(next));
    }
  }, [activeChapterId]);

  const openChaptersGrid = useCallback(() => {
    setShowChaptersGrid(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeChaptersGrid = useCallback(() => {
    setShowChaptersGrid(false);
    document.body.style.overflow = '';
  }, []);

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 3000);
  }, []);

  // Group chapters by phase for rendering phase dividers
  const isFirstOfPhase = (chapterId: number) => {
    return PHASES.some(p => p.range[0] === chapterId);
  };

  return (
    <div ref={mainRef} className="relative">
      {/* Skip to content link */}
      <a href="#chapters" className="sr-only sr-only-focusable">
        Skip to chapters
      </a>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-5 flex justify-between items-center bg-gradient-to-b from-[#F4EFE6]/95 via-[#F4EFE6]/80 to-transparent shadow-sm">
        <div className="text-sm font-medium tracking-wide text-[#14181F]">
          Geeta In Modern World
        </div>
        <div className="hidden md:flex items-center gap-8">
          {currentScrollChapter > 0 && (
            <span className="text-xs text-[#D6A23A] font-medium">
              Chapter {currentScrollChapter} of {chapters.length}
            </span>
          )}
          <button onClick={openChaptersGrid} className="text-sm text-[#14181F]/70 hover:text-[#14181F] transition-colors">
            Chapters
          </button>
          <a href="#about" className="text-sm text-[#14181F]/70 hover:text-[#14181F] transition-colors">About</a>
          <a href="#contact" className="text-sm text-[#14181F]/70 hover:text-[#14181F] transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero-section" className="pinned-section" style={{ zIndex: 10 }}>
        <div ref={heroBgRef} className="absolute inset-0">
          <img src="/cover_bg.jpg" alt="" className="bg-image" />
          <div className="vignette-overlay" />
        </div>

        <div
          ref={heroCardRef}
          className="absolute left-[6vw] top-1/2 -translate-y-1/2 w-[42vw] min-w-[320px] max-w-[640px] z-10"
        >
          <div className="chapter-card p-8 lg:p-10">
            <span className="eyebrow mb-4 block">A Modern Retelling</span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl mb-4 text-[#14181F]">
              Geeta In<br />Modern World
            </h1>
            <p className="text-base lg:text-lg text-[#6B6F78] mb-4">
              Eighteen chapters. Eighteen lives. One timeless conversation.
            </p>
            <p className="text-sm text-[#6B6F78]/70 mb-8 italic">
              Life is a battlefield — of choices, pressures, and identity. These stories explore ancient wisdom through the lens of modern struggles.
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => {
                  const chaptersSection = document.getElementById('chapters');
                  chaptersSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                Start Reading
              </button>
              {lastReadChapter && (
                <button
                  onClick={() => openReader(lastReadChapter)}
                  className="px-6 py-3 rounded-full font-medium transition-all duration-300 border border-[#D6A23A]/40 text-[#D6A23A] hover:bg-[#D6A23A] hover:text-[#0B0F17]"
                >
                  Continue Chapter {lastReadChapter}
                </button>
              )}
            </div>
            <p className="text-xs text-[#6B6F78]">
              Free digital edition · No signup required
            </p>
          </div>
        </div>
      </section>

      {/* Chapter Sections */}
      <main id="chapters">
        {visibleChapters.map((chapter, index) => {
          const phase = getPhaseForChapter(chapter.id);
          return (
            <section
              key={chapter.id}
              id={`chapter-${chapter.id}`}
              className="pinned-section"
              style={{ zIndex: 20 + index }}
              aria-label={`${chapter.badge}: ${chapter.title}`}
            >
              <div className="bg-wrapper absolute inset-0">
                <img
                  src={chapter.bgImage}
                  alt=""
                  className="bg-image"
                  style={{
                    filter: 'saturate(0.85) contrast(1.05)',
                  }}
                />
                <div className="vignette-overlay" />
              </div>

              <div className="absolute left-[6vw] top-1/2 -translate-y-1/2 w-[44vw] max-w-[680px] z-10">
                {/* Phase divider for first chapter of each phase */}
                {isFirstOfPhase(chapter.id) && phase && (
                  <div className="mb-4 px-1">
                    <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A]/80 font-medium">
                      Phase {PHASES.indexOf(phase) + 1}: {phase.name}
                    </span>
                  </div>
                )}
                <ChapterCard
                  badge={chapter.badge}
                  title={chapter.title}
                  story={chapter.story.plot}
                  phase={phase?.name}
                  readingTime={chapter.readingTimeMinutes}
                  onReadClick={() => openReader(chapter.id)}
                  onTitleClick={() => openReader(chapter.id)}
                />
              </div>
            </section>
          );
        })}
      </main>

      {/* Load More Chapters */}
      {hasMoreChapters && (
        <section
          className="relative flex items-center justify-center min-h-screen"
          style={{ backgroundColor: '#0B0F17', zIndex: 20 + visibleCount }}
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.15em] text-[#D6A23A]/80 font-medium mb-3">
              {visibleCount} of {chapters.length} chapters
            </p>
            <h2 className="text-3xl lg:text-4xl text-[#F4EFE6] mb-6">
              Continue the Journey
            </h2>
            <p className="text-base text-[#F4EFE6]/50 mb-10 max-w-md mx-auto">
              {chapters.length - visibleCount} more chapters await. Load the next batch to keep scrolling.
            </p>
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + CHAPTERS_PER_BATCH, chapters.length))}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 text-[#0B0F17]"
              style={{ backgroundColor: '#D6A23A' }}
            >
              <ChevronDown className="w-5 h-5" />
              Load More Chapters
            </button>
          </div>
        </section>
      )}

      {/* About & Contact Section */}
      <section
        id="closing-section"
        className="relative min-h-screen py-20 lg:py-32"
        style={{ backgroundColor: '#0B0F17', zIndex: 100 }}
      >
        <div className="vignette-overlay" />

        <div id="closing-content" className="relative z-10 px-6 lg:px-[6vw]">
          <div className="max-w-7xl mx-auto">

            {/* About This Project */}
            <div id="about" className="mb-20 max-w-3xl">
              <span className="eyebrow mb-4 block text-[#D6A23A]">About This Project</span>
              <h2 className="text-3xl lg:text-4xl mb-6 text-[#F4EFE6]">
                Why a Modern Retelling?
              </h2>
              <div className="space-y-4 text-base text-[#F4EFE6]/70 leading-relaxed">
                <p>
                  The Bhagavad Gita is not a relic — it's a living conversation about duty, identity, and purpose. But its language can feel distant to a generation navigating social media anxiety, career burnout, and existential pressure.
                </p>
                <p>
                  This project reimagines each of the 18 chapters through modern stories — a marketing exec facing an ethical crisis, a social media influencer questioning identity, a surgeon confronting mortality. Each story is paired with the original Sanskrit shlokas and their translations, bridging the ancient and the contemporary.
                </p>
                <p>
                  The journey follows three phases: <strong className="text-[#D6A23A]">Foundation</strong> (understanding duty and the self), <strong className="text-[#D6A23A]">Devotion</strong> (divine knowledge and surrender), and <strong className="text-[#D6A23A]">Integration</strong> (wisdom, discernment, and liberation). Read one chapter a week, or follow your curiosity.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left column - Closing message */}
              <div className="pt-10">
                <span className="eyebrow mb-4 block text-[#6B6F78]">The Journey Continues</span>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl mb-6 text-[#F4EFE6]">
                  The conversation continues.
                </h2>
                <p className="text-lg text-[#F4EFE6]/70 mb-10 max-w-md">
                  If this resonated, share it. If you want more, explore the full edition. If you have a question, ask.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={openChaptersGrid}
                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#F4EFE6]/20 text-[#F4EFE6] hover:bg-[#F4EFE6]/10 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" /> Explore All 18 Chapters
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#F4EFE6]/20 text-[#F4EFE6] hover:bg-[#F4EFE6]/10 transition-colors">
                    <Heart className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>

              {/* Right column - Contact form */}
              <div className="lg:pt-10" id="contact">
                <div
                  className="p-8 rounded-[22px]"
                  style={{
                    background: 'rgba(244, 239, 230, 0.06)',
                    border: '1px solid rgba(244, 239, 230, 0.12)'
                  }}
                >
                  <h3 className="text-xl font-medium mb-6 text-[#F4EFE6]">Get in Touch</h3>

                  {contactSubmitted ? (
                    <div className="text-center py-10">
                      <p className="text-lg text-[#D6A23A] font-medium mb-2">Thank you!</p>
                      <p className="text-sm text-[#F4EFE6]/60">Your message has been received. We'll get back to you soon.</p>
                    </div>
                  ) : (
                    <form className="space-y-5" onSubmit={handleContactSubmit}>
                      <div>
                        <label htmlFor="contact-name" className="block text-sm text-[#F4EFE6]/60 mb-2">Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/5 border border-[#F4EFE6]/10 text-[#F4EFE6] placeholder:text-[#F4EFE6]/30 focus:outline-none focus:border-[#D6A23A]/50"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-sm text-[#F4EFE6]/60 mb-2">Email</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/5 border border-[#F4EFE6]/10 text-[#F4EFE6] placeholder:text-[#F4EFE6]/30 focus:outline-none focus:border-[#D6A23A]/50"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="block text-sm text-[#F4EFE6]/60 mb-2">Message</label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/5 border border-[#F4EFE6]/10 text-[#F4EFE6] placeholder:text-[#F4EFE6]/30 focus:outline-none focus:border-[#D6A23A]/50 resize-none"
                          placeholder="Your message..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
                        style={{ backgroundColor: '#D6A23A', color: '#0B0F17' }}
                      >
                        <MessageCircle className="w-4 h-4" /> Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-[#F4EFE6]/10 text-center">
              <p className="text-sm text-[#F4EFE6]/40 mb-2">
                © Geeta In Modern World. Built for contemplation, not conversion.
              </p>
              <p className="text-xs text-[#F4EFE6]/25">
                This is a creative interpretation of the Bhagavad Gita for educational and inspirational purposes. For scholarly study, please consult traditional commentaries and qualified teachers.
              </p>
            </footer>
          </div>
        </div>
      </section>

      {/* Back to Top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[90] p-3 rounded-full bg-[#0B0F17] text-[#F4EFE6] shadow-lg hover:bg-[#D6A23A] hover:text-[#0B0F17] transition-all duration-300"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Ebook Reader Modal */}
      {activeChapterId && (
        <EbookReader
          chapterId={activeChapterId}
          onClose={closeReader}
          onNextChapter={goToNextChapter}
          hasNextChapter={activeChapterId < chapters.length}
        />
      )}

      {/* Chapters Grid Modal */}
      {showChaptersGrid && (
        <ChaptersGrid
          onSelectChapter={openReader}
          onClose={closeChaptersGrid}
        />
      )}
    </div>
  );
}

export default App;
