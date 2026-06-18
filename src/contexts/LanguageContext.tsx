/**
 * LanguageContext — EN / VI multi-language switch with AsyncStorage persistence.
 * Applies immediately; preserves form values per WBS (state lives above forms).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'en' | 'vi';

const STORAGE_KEY = '@ion/lang';

export interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => undefined,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((v) => {
        if (v === 'vi') setLangState('vi');
      })
      .catch(() => undefined);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    AsyncStorage.setItem(STORAGE_KEY, l).catch(() => undefined);
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'en', label: 'English (EN)' },
  { code: 'vi', label: 'Tiếng Việt (VI)' },
];

export default LanguageContext;
