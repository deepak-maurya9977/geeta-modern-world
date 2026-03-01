import { useState } from 'react';
import { BookOpen, X, Search } from 'lucide-react';
import { chapters } from '../data/chapters';

interface ChaptersGridProps {
  onSelectChapter: (chapterId: number) => void;
  onClose: () => void;
}

const PHASES = [
  { name: 'Foundation', range: [1, 6] },
  { name: 'Devotion', range: [7, 12] },
  { name: 'Integration', range: [13, 18] },
];

export default function ChaptersGrid({ onSelectChapter, onClose }: ChaptersGridProps) {
  const [search, setSearch] = useState('');

  const filtered = chapters.filter((ch) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      ch.title.toLowerCase().includes(q) ||
      ch.subtitle.toLowerCase().includes(q) ||
      ch.story.plot.toLowerCase().includes(q) ||
      ch.modernContext.toLowerCase().includes(q) ||
      ch.badge.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-[100] bg-[#0B0F17] overflow-y-auto" role="dialog" aria-label="All 18 Chapters">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0B0F17]/90 backdrop-blur-md border-b border-[#F4EFE6]/10">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-[#F4EFE6]">
              All 18 Chapters
            </h1>
            <p className="text-sm text-[#F4EFE6]/60 mt-1">
              Select a chapter to begin your journey
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4EFE6]/10 text-[#F4EFE6] text-sm font-medium hover:bg-[#F4EFE6]/20 transition-colors"
            aria-label="Close chapters grid"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pb-4 max-w-7xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4EFE6]/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chapters by title, theme, or topic..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F4EFE6]/5 border border-[#F4EFE6]/10 text-[#F4EFE6] text-sm placeholder:text-[#F4EFE6]/30 focus:outline-none focus:border-[#D6A23A]/50"
            />
          </div>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="px-6 py-8 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#F4EFE6]/40">No chapters match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((chapter, index) => {
              const phase = PHASES.find(p => chapter.id >= p.range[0] && chapter.id <= p.range[1]);
              return (
                <button
                  key={chapter.id}
                  onClick={() => onSelectChapter(chapter.id)}
                  className="group text-left p-6 rounded-2xl bg-[#F4EFE6]/5 border border-[#F4EFE6]/10 hover:bg-[#F4EFE6]/10 hover:border-[#D6A23A]/30 transition-all duration-300"
                  aria-label={`Read ${chapter.title} - ${chapter.subtitle}`}
                >
                  {/* Chapter Number & Phase */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider text-[#D6A23A]">
                        {chapter.badge}
                      </span>
                      {phase && (
                        <span className="text-[10px] uppercase tracking-wider text-[#F4EFE6]/30">
                          {phase.name}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#F4EFE6]/40">
                      {chapter.readingTimeMinutes ? `${chapter.readingTimeMinutes} min` : `${index + 1} / 18`}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif text-[#F4EFE6] mb-2 group-hover:text-[#D6A23A] transition-colors">
                    {chapter.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-[#F4EFE6]/60 mb-4 italic">
                    {chapter.subtitle}
                  </p>

                  {/* Preview */}
                  <p className="text-sm text-[#F4EFE6]/50 line-clamp-2 mb-4">
                    {chapter.story.plot}
                  </p>

                  {/* Read Button */}
                  <div className="flex items-center gap-2 text-sm text-[#D6A23A] opacity-0 group-hover:opacity-100 transition-opacity">
                    <BookOpen className="w-4 h-4" />
                    <span>Read Chapter</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-8 border-t border-[#F4EFE6]/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-[#F4EFE6]/40">
            "The Bhagavad Gita is the most systematic statement of spiritual evolution of endowing value to mankind."
            <span className="block mt-1">— Aldous Huxley</span>
          </p>
        </div>
      </div>
    </div>
  );
}
