import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { en } from '../data/translations/en';
import { hi } from '../data/translations/hi';

export type Lang = 'en' | 'hi';

type TranslationMap = typeof en;
type TranslationKey = keyof TranslationMap;

const translations: Record<Lang, Record<TranslationKey, string>> = { en, hi };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  hasLanguagePreference: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'geeta-lang';

function getSavedLang(): Lang | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'hi') return saved;
  } catch { /* SSR / private browsing */ }
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [savedLang] = useState(getSavedLang);
  const [lang, setLangState] = useState<Lang>(savedLang ?? 'en');
  const [hasLanguagePreference, setHasLanguagePreference] = useState(savedLang !== null);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    setHasLanguagePreference(true);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch { /* ignore */ }
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    return translations[lang][key] ?? translations.en[key] ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, hasLanguagePreference }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
