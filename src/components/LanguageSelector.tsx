import type { Lang } from '../lib/language';

interface LanguageSelectorProps {
  onSelect: (lang: Lang) => void;
}

export default function LanguageSelector({ onSelect }: LanguageSelectorProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-sm" style={{ background: 'rgba(13,27,42,0.95)' }}>
      <div className="relative w-[90vw] max-w-md mx-auto text-center px-8 py-12 rounded-3xl shadow-2xl" style={{ background: '#0D1B2A', border: '1px solid rgba(212,168,90,0.25)' }}>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/geeta-modern-world/DivyaDarshan.jpeg"
            alt="Divya Darshan"
            className="w-24 h-24 rounded-full object-cover shadow-xl"
            style={{ border: '2px solid rgba(212,168,90,0.4)' }}
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
              const fallback = el.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback */}
          <div
            className="w-24 h-24 rounded-full items-center justify-center text-4xl shadow-xl"
            style={{ background: '#0D1B2A', border: '2px solid rgba(212,168,90,0.4)', display: 'none', color: '#D4A85A' }}
          >
            ॐ
          </div>
        </div>

        {/* Brand name */}
        <h1 className="text-3xl md:text-4xl font-serif mb-1" style={{ color: '#D4A85A', fontFamily: 'Playfair Display, serif' }}>
          Divya Darshan
        </h1>
        <p className="text-base font-serif mb-1" style={{ color: '#D4A85A', fontFamily: 'Playfair Display, serif' }}>
          दिव्य दर्शन
        </p>
        <p className="text-xs uppercase tracking-[0.2em] mb-8" style={{ color: 'rgba(232,224,208,0.45)' }}>
          Divine Vision
        </p>

        {/* Language buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => onSelect('en')}
            className="w-full py-4 px-6 rounded-2xl text-lg font-medium transition-all duration-300 active:scale-[0.98]"
            style={{ border: '2px solid rgba(212,168,90,0.35)', color: '#D4A85A', background: 'transparent' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#D4A85A'; (e.currentTarget as HTMLButtonElement).style.color = '#0D1B2A'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#D4A85A'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#D4A85A'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,168,90,0.35)'; }}
          >
            English
          </button>
          <button
            onClick={() => onSelect('hi')}
            className="w-full py-4 px-6 rounded-2xl text-lg font-medium transition-all duration-300 active:scale-[0.98]"
            style={{ border: '2px solid rgba(212,168,90,0.35)', color: '#D4A85A', background: 'transparent' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#D4A85A'; (e.currentTarget as HTMLButtonElement).style.color = '#0D1B2A'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#D4A85A'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#D4A85A'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,168,90,0.35)'; }}
          >
            हिन्दी
          </button>
        </div>

        <p className="text-xs mt-8" style={{ color: 'rgba(232,224,208,0.3)' }}>
          You can change this anytime from the navigation bar
        </p>
      </div>
    </div>
  );
}
