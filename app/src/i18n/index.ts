import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { translations, type Language, type Translations } from './translations';

export { languageNames } from './translations';
export type { Language, Translations } from './translations';

type LanguageState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'network-infrastructure-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

/** Current UI language. */
export function useLanguage(): Language {
  return useLanguageStore((state) => state.language);
}

/** Setter for the UI language. */
export function useSetLanguage(): (language: Language) => void {
  return useLanguageStore((state) => state.setLanguage);
}

/** Translations for the current language (falls back to English). */
export function useT(): Translations {
  const language = useLanguage();
  return translations[language] ?? translations.en;
}

/**
 * Non-reactive translations accessor for use outside React hooks
 * (e.g. class components / error boundaries). Reads the current store value.
 */
export function getT(): Translations {
  return translations[useLanguageStore.getState().language] ?? translations.en;
}
