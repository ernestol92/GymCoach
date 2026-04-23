import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import sv from './locales/sv.json'
import pt from './locales/pt.json'
import es from './locales/es.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,

    detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
    },

    resources: {
    en: { translation: en },
    sv: { translation: sv },
    pt: { translation: pt },
    es: { translation: es }
  }
  })

export default i18n