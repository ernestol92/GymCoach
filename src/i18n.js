import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import enExercises from './locales/enDefaultExercises.json'
import sv from './locales/sv.json'
import svExercises from './locales/svDefaultExercises.json'
import pt from './locales/pt.json'
import ptExercises from './locales/ptDefaultExercises.json'
import es from './locales/es.json'
import esExercises from './locales/esDefaultExercises.json'

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
      en: {
        translation: {
          ...en,
          exercises: enExercises
        }
      },
      sv: {
        translation: {
          ...sv,
          exercises: svExercises
        }
      },
      pt: {
        translation: {
          ...pt,
          exercises: ptExercises
        }
      },
      es: {
        translation: {
          ...es,
          exercises: esExercises
        }
      }
    }
  })

export default i18n