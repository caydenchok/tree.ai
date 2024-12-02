import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translation: {
        // English translations will be loaded from i18n.ts
      }
    },
    ms: {
      translation: {
        // Malay translations will be loaded from i18n.ts
      }
    },
    zh: {
      translation: {
        // Chinese translations will be loaded from i18n.ts
      }
    },
    ta: {
      translation: {
        // Tamil translations will be loaded from i18n.ts
      }
    }
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
