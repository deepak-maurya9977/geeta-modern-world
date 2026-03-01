import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Maximize2, Minimize2, ArrowRight, Lightbulb, HelpCircle, Dumbbell } from 'lucide-react';
import { chapters } from '../data/chapters';

interface EbookReaderProps {
  chapterId: number;
  onClose: () => void;
  onNextChapter?: () => void;
  hasNextChapter?: boolean;
}

const PHASES = [
  { name: 'Foundation', range: [1, 6] },
  { name: 'Devotion', range: [7, 12] },
  { name: 'Integration', range: [13, 18] },
];

function getPhaseLabel(id: number) {
  const p = PHASES.find(p => id >= p.range[0] && id <= p.range[1]);
  return p ? `Phase ${PHASES.indexOf(p) + 1}: ${p.name}` : '';
}

// Glossary tooltip component
function GlossaryInline({ terms }: { terms: { term: string; definition: string }[] }) {
  if (!terms || terms.length === 0) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {terms.map((t) => (
        <span
          key={t.term}
          className="group relative inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-[#D6A23A]/10 text-[#D6A23A] border border-[#D6A23A]/20 cursor-help"
          title={t.definition}
        >
          {t.term}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 rounded-lg bg-[#0B0F17] text-[#F4EFE6] text-xs leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 shadow-xl z-20">
            <strong className="text-[#D6A23A]">{t.term}</strong>: {t.definition}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function EbookReader({
  chapterId,
  onClose,
  onNextChapter,
  hasNextChapter = false
}: EbookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const readerRef = useRef<HTMLDivElement>(null);

  const chapter = chapters.find(c => c.id === chapterId);

  if (!chapter) return null;

  // Build pages array with new page types
  const storyPages = [
    { type: 'title', content: null },
    { type: 'character', content: chapter.story },
    { type: 'plot', content: chapter.story },
    { type: 'dilemma', content: chapter.story },
    { type: 'resolution', content: chapter.story },
    { type: 'lesson', content: chapter.story },
    ...(chapter.practicalTakeaway ? [{ type: 'takeaway' as const, content: chapter.practicalTakeaway }] : []),
    { type: 'shloka-intro', content: null },
    ...chapter.shlokas.map((shloka) => ({
      type: 'shloka' as const,
      content: shloka
    })),
    { type: 'summary', content: chapter.summary },
    { type: 'teaching', content: chapter.keyTeaching },
    ...(chapter.reflectionQuestions?.length ? [{ type: 'reflection' as const, content: chapter.reflectionQuestions }] : []),
    ...(chapter.tryThis ? [{ type: 'tryThis' as const, content: chapter.tryThis }] : []),
    { type: 'chapter-end', content: null },
  ];

  const totalPages = storyPages.length;
  const isLastPage = currentPage === totalPages - 1;

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 8000);
  }, []);

  const handleInteraction = useCallback(() => {
    resetControlsTimer();
  }, [resetControlsTimer]);

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsTransitioning(false);
      }, 300);
      resetControlsTimer();
    }
  }, [totalPages, isTransitioning, resetControlsTimer]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      try {
        await readerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } catch {
        // Fullscreen not supported
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch {
        // Error exiting fullscreen
      }
    }
    resetControlsTimer();
  }, [resetControlsTimer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (isLastPage && hasNextChapter && onNextChapter) {
          onNextChapter();
        } else {
          nextPage();
        }
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      } else if (e.key === 'Escape') {
        if (!document.fullscreenElement) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, onClose, isLastPage, hasNextChapter, onNextChapter]);

  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [resetControlsTimer]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [chapterId]);

  const currentContent = storyPages[currentPage];

  const renderPageContent = () => {
    switch (currentContent.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#D6A23A]/60 mb-2">
              {getPhaseLabel(chapter.id)}
            </span>
            <span className="text-sm uppercase tracking-[0.2em] text-[#D6A23A] mb-4">
              {chapter.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#14181F] mb-4">
              {chapter.title}
            </h1>
            <p className="text-lg text-[#6B6F78] italic mb-8">
              {chapter.subtitle}
            </p>
            <div className="w-16 h-px bg-[#D6A23A] mb-8" />
            <p className="text-sm text-[#6B6F78] max-w-md">
              A modern retelling of the Bhagavad Gita's timeless wisdom
            </p>
            {chapter.readingTimeMinutes && (
              <p className="text-xs text-[#6B6F78]/60 mt-4">{chapter.readingTimeMinutes} min read</p>
            )}
          </div>
        );

      case 'character':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16">
            <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A] mb-6">
              The Story
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-[#14181F] mb-6">
              Meet {chapter.story.character.split(',')[0]}
            </h2>
            <p className="text-lg text-[#14181F]/80 leading-relaxed mb-6">
              <span className="font-medium">Setting:</span> {chapter.story.setting}
            </p>
            <p className="text-base text-[#6B6F78] leading-relaxed">
              {chapter.story.character}
            </p>
          </div>
        );

      case 'plot':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16">
            <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A] mb-6">
              The Journey
            </span>
            <p className="text-lg text-[#14181F]/90 leading-relaxed">
              {chapter.story.plot}
            </p>
          </div>
        );

      case 'dilemma':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16">
            <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A] mb-6">
              The Crossroads
            </span>
            <div className="border-l-2 border-[#D6A23A] pl-6">
              <p className="text-xl md:text-2xl font-serif text-[#14181F] leading-relaxed italic">
                "{chapter.story.dilemma}"
              </p>
            </div>
          </div>
        );

      case 'resolution':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16">
            <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A] mb-6">
              The Resolution
            </span>
            <p className="text-lg text-[#14181F]/90 leading-relaxed mb-6">
              {chapter.story.resolution}
            </p>
            <div className="mt-4 p-4 rounded-lg bg-[#D6A23A]/5 border border-[#D6A23A]/10">
              <p className="text-sm text-[#6B6F78] italic">
                Like a wise mentor's inner voice: sometimes the hardest choice is the one that aligns with who you truly are.
              </p>
            </div>
          </div>
        );

      case 'lesson':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16">
            <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A] mb-6">
              The Wisdom
            </span>
            <div className="bg-[#F4EFE6] rounded-xl p-8 border border-[#D6A23A]/20">
              <p className="text-xl font-serif text-[#14181F] leading-relaxed">
                {chapter.story.lesson}
              </p>
            </div>
          </div>
        );

      case 'takeaway':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-4 h-4 text-[#D6A23A]" />
              <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A]">
                Practical Takeaway
              </span>
            </div>
            <div className="bg-[#0B0F17] rounded-xl p-8">
              <p className="text-xl font-serif text-[#F4EFE6] leading-relaxed">
                {currentContent.content as string}
              </p>
            </div>
            <p className="text-sm text-[#6B6F78] mt-4 text-center italic">
              Something you can apply today.
            </p>
          </div>
        );

      case 'shloka-intro':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A] mb-6">
              The Sacred Verse
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#14181F] mb-4">
              Original Shlokas
            </h2>
            <p className="text-base text-[#6B6F78] max-w-md mb-8">
              The timeless Sanskrit verses with their English translations
            </p>
            <div className="flex items-center gap-2 text-sm text-[#D6A23A]">
              <BookOpen className="w-4 h-4" />
              <span>{chapter.shlokas.length} verses to explore</span>
            </div>
            {chapter.glossaryTerms && chapter.glossaryTerms.length > 0 && (
              <div className="mt-8">
                <p className="text-xs text-[#6B6F78] mb-3">Key terms in this chapter (hover for definition):</p>
                <GlossaryInline terms={chapter.glossaryTerms} />
              </div>
            )}
          </div>
        );

      case 'shloka': {
        const shloka = currentContent.content as typeof chapter.shlokas[0];
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16">
            <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A] mb-6">
              Bhagavad Gita {shloka.number}
            </span>
            <div className="mb-8">
              <p className="text-xl md:text-2xl text-[#14181F] leading-relaxed font-serif whitespace-pre-line">
                {shloka.sanskrit}
              </p>
            </div>
            <div className="border-t border-[#D6A23A]/20 pt-6">
              <p className="text-sm uppercase tracking-wider text-[#6B6F78] mb-3">
                Translation
              </p>
              <p className="text-lg text-[#14181F]/90 leading-relaxed">
                {shloka.translation}
              </p>
            </div>
          </div>
        );
      }

      case 'summary':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16">
            <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A] mb-6">
              Chapter Summary
            </span>
            <p className="text-lg text-[#14181F]/90 leading-relaxed">
              {chapter.summary}
            </p>
          </div>
        );

      case 'teaching':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16">
            <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A] mb-6">
              Key Teaching
            </span>
            <div className="bg-[#0B0F17] rounded-xl p-8">
              <p className="text-xl font-serif text-[#F4EFE6] leading-relaxed">
                {chapter.keyTeaching}
              </p>
            </div>
            <p className="text-sm text-[#6B6F78] mt-6 text-center">
              Modern Context: {chapter.modernContext}
            </p>
          </div>
        );

      case 'reflection': {
        const questions = currentContent.content as string[];
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-4 h-4 text-[#D6A23A]" />
              <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A]">
                Reflection Questions
              </span>
            </div>
            <div className="space-y-6">
              {questions.map((q, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D6A23A]/10 text-[#D6A23A] flex items-center justify-center text-sm font-medium">
                    {i + 1}
                  </span>
                  <p className="text-lg text-[#14181F]/90 leading-relaxed pt-1">
                    {q}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#6B6F78] mt-8 text-center italic">
              Sit with these questions. There are no wrong answers.
            </p>
          </div>
        );
      }

      case 'tryThis':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16">
            <div className="flex items-center gap-2 mb-6">
              <Dumbbell className="w-4 h-4 text-[#D6A23A]" />
              <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A]">
                Try This
              </span>
            </div>
            <div className="bg-[#F4EFE6] rounded-xl p-8 border-2 border-dashed border-[#D6A23A]/30">
              <p className="text-xl font-serif text-[#14181F] leading-relaxed">
                {currentContent.content as string}
              </p>
            </div>
            <p className="text-sm text-[#6B6F78] mt-4 text-center italic">
              Wisdom is only real when practiced.
            </p>
          </div>
        );

      case 'chapter-end':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <span className="text-xs uppercase tracking-[0.15em] text-[#D6A23A] mb-6">
              Chapter Complete
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#14181F] mb-4">
              {chapter.title}
            </h2>
            <div className="w-16 h-px bg-[#D6A23A] mb-8" />
            <p className="text-base text-[#6B6F78] max-w-md mb-8">
              You have completed this chapter. The journey of wisdom continues.
            </p>

            {hasNextChapter && onNextChapter ? (
              <button
                onClick={onNextChapter}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#D6A23A] text-[#0B0F17] font-medium hover:bg-[#c4932f] transition-colors"
              >
                Read Next Chapter <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B0F17] text-[#F4EFE6] font-medium hover:bg-[#D6A23A] hover:text-[#0B0F17] transition-colors"
              >
                <X className="w-4 h-4" /> Close Reader
              </button>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={readerRef}
      className="fixed inset-0 z-[100] bg-[#F4EFE6]"
      role="dialog"
      aria-label={`Reading ${chapter.title}`}
      onClick={handleInteraction}
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Top bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-[#F4EFE6] to-transparent transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B0F17] text-[#F4EFE6] text-sm font-medium hover:bg-[#D6A23A] hover:text-[#0B0F17] transition-colors"
            aria-label="Close reader"
          >
            <X className="w-4 h-4" />
            Close
          </button>
          <span className="text-sm text-[#6B6F78] hidden md:inline">
            {chapter.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-[#14181F]/5 text-[#14181F] hover:bg-[#14181F]/10 transition-colors"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="h-full flex items-center justify-center pt-20 pb-20">
        <div
          className={`w-full max-w-4xl h-[calc(100vh-160px)] transition-all duration-300 ${
            isTransitioning ? 'opacity-0 transform translate-x-8' : 'opacity-100 transform translate-x-0'
          }`}
        >
          <div className="h-full overflow-y-auto scrollbar-hide">
            {renderPageContent()}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-10 transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress bar */}
        <div className="w-full h-1 bg-[#14181F]/10">
          <div
            className="h-full bg-[#D6A23A] transition-all duration-300"
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-t from-[#F4EFE6] to-transparent">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            aria-label="Previous page"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentPage === 0
                ? 'opacity-30 cursor-not-allowed text-[#6B6F78]'
                : 'bg-[#14181F]/5 text-[#14181F] hover:bg-[#14181F]/10'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="text-sm text-[#6B6F78]">
            {currentPage + 1} / {totalPages}
          </span>

          {isLastPage && hasNextChapter && onNextChapter ? (
            <button
              onClick={onNextChapter}
              aria-label="Go to next chapter"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D6A23A] text-[#0B0F17] text-sm font-medium hover:bg-[#c4932f] transition-colors"
            >
              Next Chapter <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              aria-label="Next page"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentPage === totalPages - 1
                  ? 'opacity-30 cursor-not-allowed text-[#6B6F78]'
                  : 'bg-[#14181F]/5 text-[#14181F] hover:bg-[#14181F]/10'
              }`}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Side navigation arrows */}
      <button
        onClick={prevPage}
        disabled={currentPage === 0}
        aria-label="Previous page"
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#14181F]/5 text-[#14181F] hover:bg-[#14181F]/10 transition-all duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {isLastPage && hasNextChapter && onNextChapter ? (
        <button
          onClick={onNextChapter}
          aria-label="Go to next chapter"
          className={`fixed right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#D6A23A] text-[#0B0F17] hover:bg-[#c4932f] transition-all duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      ) : (
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          aria-label="Next page"
          className={`fixed right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#14181F]/5 text-[#14181F] hover:bg-[#14181F]/10 transition-all duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } ${currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Click zones for page turning */}
      <div
        className="fixed left-0 top-20 bottom-20 w-1/4 z-0 cursor-pointer"
        onClick={prevPage}
      />
      <div
        className="fixed right-0 top-20 bottom-20 w-1/4 z-0 cursor-pointer"
        onClick={isLastPage && hasNextChapter ? onNextChapter : nextPage}
      />
    </div>
  );
}
