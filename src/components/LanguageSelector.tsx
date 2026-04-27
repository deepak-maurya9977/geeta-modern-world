import type { Lang } from '../lib/language';

interface LanguageSelectorProps {
  onSelect: (lang: Lang) => void;
}

export default function LanguageSelector({ onSelect }: LanguageSelectorProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#2C1810]/90 backdrop-blur-sm">
      <div className="relative w-[90vw] max-w-md mx-auto text-center px-8 py-12 rounded-3xl bg-[#FDF6EC] shadow-2xl border border-[#D6A23A]/20">
        {/* Decorative mandala */}
        <div className="saffron-mandala mx-auto mb-8" />

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-serif text-[#2C1810] mb-2">
          Choose Your Language
        </h1>
        <p className="text-lg text-[#8B7355] mb-10 font-serif">
          अपनी भाषा चुनें
        </p>

        {/* Language buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => onSelect('en')}
            className="w-full py-4 px-6 rounded-2xl text-lg font-medium transition-all duration-300 border-2 border-[#D6A23A]/30 text-[#2C1810] hover:bg-[#D6A23A] hover:text-white hover:border-[#D6A23A] active:scale-[0.98]"
          >
            English
          </button>
          <button
            onClick={() => onSelect('hi')}
            className="w-full py-4 px-6 rounded-2xl text-lg font-medium transition-all duration-300 border-2 border-[#D6A23A]/30 text-[#2C1810] hover:bg-[#D6A23A] hover:text-white hover:border-[#D6A23A] active:scale-[0.98]"
          >
            हिन्दी
          </button>
        </div>

        {/* Subtle footer */}
        <p className="text-xs text-[#8B7355]/50 mt-8">
          You can change this anytime from the navigation bar
        </p>
      </div>
    </div>
  );
}
