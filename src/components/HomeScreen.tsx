import { Globe, ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '../lib/language';

interface Teaching {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  tagEn: string;
  tagHi: string;
  image: string;
  available: boolean;
  accentColor: string;
}

const TEACHINGS: Teaching[] = [
  {
    id: 'geeta',
    titleEn: 'Geeta in Modern World',
    titleHi: 'गीता आधुनिक संसार में',
    descEn: 'Eighteen chapters of the Bhagavad Gita retold through modern lives — a marketer, a coder, a doctor. Ancient wisdom for today\'s battles.',
    descHi: 'भगवद्गीता के अठारह अध्याय आधुनिक जीवनों के माध्यम से — एक मार्केटर, एक कोडर, एक डॉक्टर। आज की लड़ाइयों के लिए प्राचीन ज्ञान।',
    tagEn: '18 Chapters · Available Now',
    tagHi: '18 अध्याय · अभी उपलब्ध',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    available: true,
    accentColor: '#D4A85A',
  },
  {
    id: 'ashtavakra',
    titleEn: 'Ashtavakra Mahageeta',
    titleHi: 'अष्टावक्र महागीता',
    descEn: 'The radical dialogue between sage Ashtavakra and King Janaka — the most direct teaching on pure consciousness and absolute freedom.',
    descHi: 'ऋषि अष्टावक्र और राजा जनक के बीच क्रांतिकारी संवाद — शुद्ध चेतना और परम स्वतंत्रता पर सबसे प्रत्यक्ष शिक्षा।',
    tagEn: 'Coming Soon',
    tagHi: 'जल्द आ रहा है',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    available: false,
    accentColor: '#7C6BC9',
  },
  {
    id: 'shiv-puran',
    titleEn: 'Shiv Puran',
    titleHi: 'शिव पुराण',
    descEn: 'The cosmic stories of Mahadev — creation, destruction, devotion, and the eternal dance of Shiva. Timeless myths retold for the modern seeker.',
    descHi: 'महादेव की ब्रह्मांडीय कहानियाँ — सृष्टि, विनाश, भक्ति और शिव का शाश्वत नृत्य। आधुनिक साधक के लिए पुनर्कथित कालातीत मिथक।',
    tagEn: 'Coming Soon',
    tagHi: 'जल्द आ रहा है',
    image: 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=800&q=80',
    available: false,
    accentColor: '#4A90A4',
  },
  {
    id: 'buddha',
    titleEn: 'Buddha Teachings',
    titleHi: 'बुद्ध की शिक्षाएँ',
    descEn: 'The Dhamma in everyday language — the Four Noble Truths, the Eightfold Path, and the art of living with awareness, compassion, and peace.',
    descHi: 'रोजमर्रा की भाषा में धम्म — चार आर्य सत्य, अष्टांगिक मार्ग और जागरूकता, करुणा और शांति के साथ जीने की कला।',
    tagEn: 'Coming Soon',
    tagHi: 'जल्द आ रहा है',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    available: false,
    accentColor: '#C4874A',
  },
];

interface HomeScreenProps {
  onSelectTeaching: (id: string) => void;
}

export default function HomeScreen({ onSelectTeaching }: HomeScreenProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="min-h-screen relative" style={{ background: '#0D1B2A' }}>
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 flex justify-between items-center" style={{ background: '#0D1B2A', borderBottom: '1px solid rgba(212,168,90,0.15)' }}>
        <div className="flex items-center gap-3">
          <img
            src="/geeta-modern-world/DivyaDarshan.jpeg"
            alt="Divya Darshan logo"
            className="w-9 h-9 rounded-full object-cover border border-[#D4A85A]/30"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide" style={{ color: '#D4A85A', fontFamily: 'Playfair Display, serif' }}>
              {lang === 'hi' ? 'दिव्य दर्शन' : 'Divya Darshan'}
            </span>
            <span className="text-[10px] tracking-widest uppercase" style={{ color: '#E8E0D0', opacity: 0.6 }}>
              Divine Vision
            </span>
          </div>
        </div>
        <button
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
          style={{ border: '1px solid rgba(212,168,90,0.35)', color: '#D4A85A' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#D4A85A'; (e.currentTarget as HTMLButtonElement).style.color = '#0D1B2A'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#D4A85A'; }}
          aria-label={`Switch to ${lang === 'en' ? 'Hindi' : 'English'}`}
        >
          <Globe className="w-3.5 h-3.5" />
          {t('lang.toggle')}
        </button>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-10 px-4 md:px-8 text-center">
        {/* Logo hero */}
        <div className="flex justify-center mb-6">
          <img
            src="/geeta-modern-world/DivyaDarshan.jpeg"
            alt="Divya Darshan — Divine Vision"
            className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover shadow-2xl"
            style={{ border: '2px solid rgba(212,168,90,0.4)' }}
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
              const fallback = el.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback mandala if logo not yet uploaded */}
          <div
            className="w-28 h-28 md:w-36 md:h-36 rounded-full items-center justify-center text-5xl shadow-2xl"
            style={{ background: '#0D1B2A', border: '2px solid rgba(212,168,90,0.4)', display: 'none' }}
          >
            ॐ
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: '#D4A85A' }}>
          {lang === 'hi' ? 'आधुनिक पुनर्कथन' : 'Modern Retellings'}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-3 max-w-2xl mx-auto leading-tight" style={{ color: '#D4A85A', fontFamily: 'Playfair Display, serif' }}>
          {lang === 'hi' ? 'दिव्य दर्शन' : 'Divya Darshan'}
        </h1>
        <p className="text-base md:text-lg max-w-xl mx-auto mb-2" style={{ color: '#E8E0D0' }}>
          {lang === 'hi'
            ? 'भारत की महान आध्यात्मिक परंपराओं को आज के संघर्षों के लेंस से खोजें।'
            : "Explore India's greatest spiritual traditions through the lens of today's struggles."}
        </p>
        <p className="text-sm italic" style={{ color: 'rgba(232,224,208,0.5)' }}>
          {lang === 'hi' ? '— दिव्य दृष्टि —' : '— Divine Vision —'}
        </p>
      </section>

      {/* Divider */}
      <div className="h-px max-w-32 mx-auto mb-10" style={{ background: 'linear-gradient(to right, transparent, #D4A85A, transparent)', opacity: 0.4 }} />

      {/* Teaching Cards */}
      <section className="px-4 md:px-8 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TEACHINGS.map((teaching) => (
            <TeachingCard
              key={teaching.id}
              teaching={teaching}
              lang={lang}
              onSelect={() => teaching.available && onSelectTeaching(teaching.id)}
            />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs mt-12" style={{ color: 'rgba(232,224,208,0.35)' }}>
          {lang === 'hi'
            ? 'निःशुल्क · कोई साइनअप नहीं · चिंतन के लिए बनाया गया'
            : 'Free · No signup · Built for contemplation'}
        </p>
      </section>
    </div>
  );
}

function TeachingCard({
  teaching,
  lang,
  onSelect,
}: {
  teaching: Teaching;
  lang: string;
  onSelect: () => void;
}) {
  const title = lang === 'hi' ? teaching.titleHi : teaching.titleEn;
  const desc = lang === 'hi' ? teaching.descHi : teaching.descEn;
  const tag = lang === 'hi' ? teaching.tagHi : teaching.tagEn;
  const isComingSoon = !teaching.available;

  return (
    <div
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
        isComingSoon
          ? 'cursor-default opacity-80'
          : 'cursor-pointer hover:shadow-2xl hover:-translate-y-1'
      }`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: isComingSoon ? '1px solid rgba(212,168,90,0.1)' : '1px solid rgba(212,168,90,0.2)',
        backdropFilter: 'blur(8px)',
      }}
      role={teaching.available ? 'button' : undefined}
      tabIndex={teaching.available ? 0 : undefined}
      onKeyDown={(e) => { if (e.key === 'Enter' && teaching.available) onSelect(); }}
      aria-label={teaching.available ? `Open ${title}` : `${title} — Coming Soon`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={teaching.image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isComingSoon ? 'grayscale-[40%] brightness-75' : 'group-hover:scale-105'
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0D1B2A 0%, rgba(13,27,42,0.4) 50%, transparent 100%)' }} />

        {/* Tag badge */}
        <div className="absolute top-4 left-4">
          {isComingSoon ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm" style={{ background: 'rgba(13,27,42,0.8)', color: 'rgba(232,224,208,0.6)', border: '1px solid rgba(232,224,208,0.1)' }}>
              <Clock className="w-3 h-3" />
              {tag}
            </span>
          ) : (
            <span
              className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm"
              style={{
                background: `${teaching.accentColor}22`,
                color: teaching.accentColor,
                border: `1px solid ${teaching.accentColor}55`,
              }}
            >
              {tag}
            </span>
          )}
        </div>

        {/* Arrow on hover */}
        {!isComingSoon && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4A85A' }}>
              <ArrowRight className="w-4 h-4" style={{ color: '#0D1B2A' }} />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div
          className="w-8 h-0.5 rounded-full mb-3 transition-all duration-300 group-hover:w-14"
          style={{ backgroundColor: isComingSoon ? 'rgba(212,168,90,0.3)' : teaching.accentColor }}
        />
        <h2 className="text-xl font-serif mb-2 leading-snug" style={{ color: '#E8E0D0' }}>
          {title}
        </h2>
        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'rgba(232,224,208,0.6)' }}>
          {desc}
        </p>

        {!isComingSoon && (
          <div className="mt-4 flex items-center gap-1.5 text-sm font-medium" style={{ color: '#D4A85A' }}>
            {lang === 'hi' ? 'पढ़ना शुरू करें' : 'Start Reading'}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        )}

        {isComingSoon && (
          <p className="mt-4 text-xs italic" style={{ color: 'rgba(212,168,90,0.4)' }}>
            {lang === 'hi' ? 'जल्द ही उपलब्ध होगा...' : 'Coming soon...'}
          </p>
        )}
      </div>
    </div>
  );
}
