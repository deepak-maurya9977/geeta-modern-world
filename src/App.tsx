import { useEffect, useRef, useLayoutEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowRight, ArrowUp, BookOpen, ChevronDown, Heart, MessageCircle, Globe } from 'lucide-react';
import { chapters } from './data/chapters';
import { chaptersHi } from './data/chapters-hi';
import EbookReader from './components/EbookReader';
import ChaptersGrid from './components/ChaptersGrid';
import LanguageSelector from './components/LanguageSelector';
import HomeScreen from './components/HomeScreen';
import { useLanguage } from './lib/language';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS_PER_BATCH = 5;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Chapter Card Component — flowing layout, no bg images
const ChapterCard = ({
  badge,
  title,
  story,
  phase,
  readingTime,
  readingTimeLabel,
  readStoryLabel,
  readStoryOfLabel,
  onReadClick,
  onTitleClick,
}: {
  badge: string;
  title: string;
  story: string;
  phase?: string;
  readingTime?: number;
  readingTimeLabel: string;
  readStoryLabel: string;
  readStoryOfLabel: string;
  onReadClick: () => void;
  onTitleClick: () => void;
}) => (
  <div className="chapter-card-flow">
    <div className="flex items-center gap-2 md:gap-3 mb-3">
      <span className="chapter-badge">{badge}</span>
      {phase && (
        <span className="inline-block px-2 md:px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-[#D6A23A]/10 text-[#D6A23A] border border-[#D6A23A]/20">
          {phase}
        </span>
      )}
      {readingTime && (
        <span className="text-xs text-[#8B7355] ml-auto">{readingTime} {readingTimeLabel}</span>
      )}
    </div>
    <h2
      className="text-xl md:text-2xl lg:text-3xl mb-2 text-[#2C1810] cursor-pointer hover:text-[#D6A23A] transition-colors leading-tight"
      onClick={onTitleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onTitleClick(); }}
    >
      {title}
    </h2>
    <p className="text-sm md:text-base leading-relaxed text-[#2C1810]/70 mb-4">
      {story}
    </p>
    <button
      onClick={onReadClick}
      className="inline-flex items-center gap-2 text-sm font-medium text-[#D6A23A] hover:text-[#B8861B] transition-colors group"
      aria-label={`${readStoryOfLabel} ${title}`}
    >
      {readStoryLabel}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </button>
  </div>
);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const { lang, setLang, t } = useLanguage();

  // Screen state: 'language' | 'home' | 'geeta'
  const [currentScreen, setCurrentScreen] = useState<'language' | 'home' | 'geeta'>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('geeta-lang');
      if (saved === 'en' || saved === 'hi') return 'home';
    }
    return 'language';
  });

  // All hooks must be declared before any conditional returns
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [showChaptersGrid, setShowChaptersGrid] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentScrollChapter, setCurrentScrollChapter] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(CHAPTERS_PER_BATCH);
  const [lastReadChapter, setLastReadChapter] = useState<number | null>(() => {
    const saved = localStorage.getItem('geeta-last-read');
    return saved ? parseInt(saved, 10) : null;
  });

  const handleLanguageSelect = useCallback((l: Parameters<typeof setLang>[0]) => {
    setLang(l);
    setCurrentScreen('home');
  }, [setLang]);

  // Get chapters based on language
  const activeChapters = lang === 'hi' ? chaptersHi : chapters;

  // Phase config with translations
  const PHASES = [
    { name: t('phase.foundation'), range: [1, 6], description: t('phase.foundation.desc') },
    { name: t('phase.devotion'), range: [7, 12], description: t('phase.devotion.desc') },
    { name: t('phase.integration'), range: [13, 18], description: t('phase.integration.desc') },
  ];

  function getPhaseForChapter(id: number) {
    return PHASES.find(p => id >= p.range[0] && id <= p.range[1]);
  }

  function isFirstOfPhase(chapterId: number) {
    return PHASES.some(p => p.range[0] === chapterId);
  }

  const visibleChapters = activeChapters.slice(0, visibleCount);
  const hasMoreChapters = visibleCount < activeChapters.length;

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

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Track scroll position for back-to-top and chapter indicator
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.5);

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

  // Hero entrance animation
  useEffect(() => {
    if (prefersReduced || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );
    });

    return () => ctx.revert();
  }, []);

  // Simple fade-in for chapter cards on scroll
  useLayoutEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll('.chapter-card-flow');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // Closing section
      gsap.fromTo('#closing-content',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: {
            trigger: '#closing-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, mainRef);

    return () => ctx.revert();
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
    if (activeChapterId && activeChapterId < activeChapters.length) {
      const next = activeChapterId + 1;
      setActiveChapterId(next);
      setLastReadChapter(next);
      localStorage.setItem('geeta-last-read', String(next));
    }
  }, [activeChapterId, activeChapters.length]);

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

  // --- Conditional screen renders (after all hooks) ---
  if (currentScreen === 'language') {
    return <LanguageSelector onSelect={handleLanguageSelect} />;
  }

  if (currentScreen === 'home') {
    return (
      <HomeScreen
        onSelectTeaching={(id) => {
          if (id === 'geeta') setCurrentScreen('geeta');
        }}
      />
    );
  }

  return (
    <div ref={mainRef} className="relative min-h-screen" style={{ background: '#0D1B2A' }}>
      {/* Skip to content link */}
      <a href="#chapters" className="sr-only sr-only-focusable">
        {t('hero.skipToChapters')}
      </a>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-10 py-3 flex justify-between items-center" style={{ background: '#0D1B2A', borderBottom: '1px solid rgba(212,168,90,0.15)' }}>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setCurrentScreen('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') setCurrentScreen('home'); }}
          aria-label="Back to Divya Darshan home"
        >
          <img
            src="/geeta-modern-world/DivyaDarshan.jpeg"
            alt="Divya Darshan logo"
            className="w-8 h-8 rounded-full object-cover"
            style={{ border: '1px solid rgba(212,168,90,0.4)' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide" style={{ color: '#D4A85A', fontFamily: 'Playfair Display, serif' }}>
              {lang === 'hi' ? 'दिव्य दर्शन' : 'Divya Darshan'}
            </span>
            <span className="text-[9px] tracking-widest uppercase hidden md:block" style={{ color: 'rgba(232,224,208,0.5)' }}>
              Divine Vision
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          {currentScrollChapter > 0 && (
            <span className="text-xs font-medium hidden md:inline" style={{ color: '#D4A85A' }}>
              {lang === 'hi'
                ? `अध्याय ${currentScrollChapter} ${t('nav.chapterOf')} ${activeChapters.length}`
                : `Chapter ${currentScrollChapter} ${t('nav.chapterOf')} ${activeChapters.length}`}
            </span>
          )}
          <button onClick={openChaptersGrid} className="text-sm hidden md:inline transition-colors" style={{ color: 'rgba(232,224,208,0.6)' }} onMouseEnter={e => (e.currentTarget.style.color = '#D4A85A')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,224,208,0.6)')}>
            {t('nav.chapters')}
          </button>
          <a href="#about" className="text-sm hidden md:inline transition-colors" style={{ color: 'rgba(232,224,208,0.6)' }} onMouseEnter={e => (e.currentTarget.style.color = '#D4A85A')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,224,208,0.6)')}>{t('nav.about')}</a>
          <a href="#contact" className="text-sm hidden md:inline transition-colors" style={{ color: 'rgba(232,224,208,0.6)' }} onMouseEnter={e => (e.currentTarget.style.color = '#D4A85A')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,224,208,0.6)')}>{t('nav.contact')}</a>
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{ border: '1px solid rgba(212,168,90,0.35)', color: '#D4A85A' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#D4A85A'; (e.currentTarget as HTMLButtonElement).style.color = '#0D1B2A'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#D4A85A'; }}
            aria-label={`Switch to ${lang === 'en' ? 'Hindi' : 'English'}`}
          >
            <Globe className="w-3.5 h-3.5" />
            {t('lang.toggle')}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-10 md:pt-32 md:pb-16 px-4 md:px-6 lg:px-[6vw]">
        <div ref={heroRef} className="max-w-3xl mx-auto text-center">
          {/* Decorative saffron mandala accent */}
          <div className="saffron-mandala mx-auto mb-6" />

          <span className="eyebrow mb-3 block text-[#D6A23A]">{t('hero.eyebrow')}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 text-[#2C1810]">
            {t('hero.title1')}<br />{t('hero.title2')}
          </h1>
          <p className="text-base md:text-lg text-[#8B7355] mb-3 max-w-lg mx-auto">
            {t('hero.subtitle')}
          </p>
          <p className="text-sm text-[#8B7355]/70 mb-8 italic max-w-md mx-auto hidden md:block">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <button
              onClick={() => {
                const chaptersSection = document.getElementById('chapters');
                chaptersSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-saffron"
            >
              {t('hero.startReading')}
            </button>
            {lastReadChapter && (
              <button
                onClick={() => openReader(lastReadChapter)}
                className="px-6 py-3 rounded-full font-medium transition-all duration-300 border border-[#D6A23A]/40 text-[#D6A23A] hover:bg-[#D6A23A] hover:text-white"
              >
                {t('hero.continueChapter')} {lastReadChapter}
              </button>
            )}
          </div>
          <p className="text-xs text-[#8B7355]/60">
            {t('hero.freeEdition')}
          </p>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="saffron-divider" />

      {/* Chapter List */}
      <main id="chapters" className="px-4 md:px-6 lg:px-[6vw] py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {visibleChapters.map((chapter) => {
            const phase = getPhaseForChapter(chapter.id);
            return (
              <div key={chapter.id} id={`chapter-${chapter.id}`}>
                {/* Phase divider */}
                {isFirstOfPhase(chapter.id) && phase && (
                  <div className="phase-divider">
                    <span className="phase-label">
                      {lang === 'hi'
                        ? `चरण ${PHASES.indexOf(phase) + 1}: ${phase.name}`
                        : `Phase ${PHASES.indexOf(phase) + 1}: ${phase.name}`}
                    </span>
                    <p className="text-xs text-[#8B7355]/60 mt-1">{phase.description}</p>
                  </div>
                )}
                <ChapterCard
                  badge={chapter.badge}
                  title={chapter.title}
                  story={chapter.story.plot}
                  phase={phase?.name}
                  readingTime={chapter.readingTimeMinutes}
                  readingTimeLabel={t('card.minRead')}
                  readStoryLabel={t('card.readStory')}
                  readStoryOfLabel={t('card.readStoryOf')}
                  onReadClick={() => openReader(chapter.id)}
                  onTitleClick={() => openReader(chapter.id)}
                />
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {hasMoreChapters && (
          <div className="text-center py-8">
            <p className="text-xs uppercase tracking-[0.15em] text-[#D6A23A] font-medium mb-3">
              {visibleCount} {t('loadMore.of')} {activeChapters.length} {t('loadMore.chapters')}
            </p>
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + CHAPTERS_PER_BATCH, activeChapters.length))}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border border-[#D6A23A]/30 text-[#D6A23A] hover:bg-[#D6A23A] hover:text-white"
            >
              <ChevronDown className="w-4 h-4" />
              {t('loadMore.button')}
            </button>
          </div>
        )}
      </main>

      {/* About & Contact Section */}
      <section
        id="closing-section"
        className="relative py-16 lg:py-24"
        style={{ backgroundColor: '#2C1810' }}
      >
        <div id="closing-content" className="relative z-10 px-4 md:px-6 lg:px-[6vw]">
          <div className="max-w-5xl mx-auto">

            {/* About This Project */}
            <div id="about" className="mb-16 max-w-3xl">
              <span className="eyebrow mb-4 block text-[#D6A23A]">{t('about.eyebrow')}</span>
              <h2 className="text-3xl lg:text-4xl mb-6 text-[#F4EFE6]">
                {t('about.heading')}
              </h2>
              <div className="space-y-4 text-base text-[#F4EFE6]/70 leading-relaxed">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
                <p>
                  {t('about.p3text')} <strong className="text-[#D6A23A]">{t('about.p3foundation')}</strong> {t('about.p3suffix')} <strong className="text-[#D6A23A]">{t('about.p3devotion')}</strong> {t('about.p3suffix2')} <strong className="text-[#D6A23A]">{t('about.p3integration')}</strong> {t('about.p3suffix3')}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left column - Closing message */}
              <div>
                <span className="eyebrow mb-4 block text-[#8B7355]">{t('closing.eyebrow')}</span>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl mb-6 text-[#F4EFE6]">
                  {t('closing.heading')}
                </h2>
                <p className="text-lg text-[#F4EFE6]/70 mb-10 max-w-md">
                  {t('closing.text')}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={openChaptersGrid}
                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#F4EFE6]/20 text-[#F4EFE6] hover:bg-[#F4EFE6]/10 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" /> {t('closing.exploreAll')}
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#F4EFE6]/20 text-[#F4EFE6] hover:bg-[#F4EFE6]/10 transition-colors">
                    <Heart className="w-4 h-4" /> {t('closing.share')}
                  </button>
                </div>
              </div>

              {/* Right column - Contact form */}
              <div id="contact">
                <div
                  className="p-6 md:p-8 rounded-[18px]"
                  style={{
                    background: 'rgba(244, 239, 230, 0.06)',
                    border: '1px solid rgba(244, 239, 230, 0.12)'
                  }}
                >
                  <h3 className="text-xl font-medium mb-6 text-[#F4EFE6]">{t('contact.heading')}</h3>

                  {contactSubmitted ? (
                    <div className="text-center py-10">
                      <p className="text-lg text-[#D6A23A] font-medium mb-2">{t('contact.thankYou')}</p>
                      <p className="text-sm text-[#F4EFE6]/60">{t('contact.thankYouText')}</p>
                    </div>
                  ) : (
                    <form className="space-y-5" onSubmit={handleContactSubmit}>
                      <div>
                        <label htmlFor="contact-name" className="block text-sm text-[#F4EFE6]/60 mb-2">{t('contact.nameLabel')}</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/5 border border-[#F4EFE6]/10 text-[#F4EFE6] placeholder:text-[#F4EFE6]/30 focus:outline-none focus:border-[#D6A23A]/50"
                          placeholder={t('contact.namePlaceholder')}
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-sm text-[#F4EFE6]/60 mb-2">{t('contact.emailLabel')}</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/5 border border-[#F4EFE6]/10 text-[#F4EFE6] placeholder:text-[#F4EFE6]/30 focus:outline-none focus:border-[#D6A23A]/50"
                          placeholder={t('contact.emailPlaceholder')}
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="block text-sm text-[#F4EFE6]/60 mb-2">{t('contact.messageLabel')}</label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[#F4EFE6]/5 border border-[#F4EFE6]/10 text-[#F4EFE6] placeholder:text-[#F4EFE6]/30 focus:outline-none focus:border-[#D6A23A]/50 resize-none"
                          placeholder={t('contact.messagePlaceholder')}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
                        style={{ backgroundColor: '#D6A23A', color: '#2C1810' }}
                      >
                        <MessageCircle className="w-4 h-4" /> {t('contact.send')}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-[#F4EFE6]/10 text-center">
              <p className="text-sm text-[#F4EFE6]/40 mb-2">
                {t('footer.copyright')}
              </p>
              <p className="text-xs text-[#F4EFE6]/25">
                {t('footer.disclaimer')}
              </p>
            </footer>
          </div>
        </div>
      </section>

      {/* Back to Top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[90] p-3 rounded-full bg-[#2C1810] text-[#F4EFE6] shadow-lg hover:bg-[#D6A23A] hover:text-[#2C1810] transition-all duration-300"
          aria-label={t('backToTop')}
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
          hasNextChapter={activeChapterId < activeChapters.length}
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
