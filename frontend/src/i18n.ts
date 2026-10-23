import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ja from './locales/ja'
import ko from './locales/ko'


const savedLanguage = localStorage.getItem('language')
const language: 'ja' | 'ko' =
  savedLanguage === 'ja' || savedLanguage === 'ko'
    ? savedLanguage
    : 'ja'

i18n.use(initReactI18next).init({
    resources: {
        ja: { translation: ja },
        ko: { translation: ko }
    },
    lng: language,
    fallbackLng: 'ja',
    interpolation: {
        escapeValue: false
    }
})

// 최초 언어 설정
document.documentElement.lang = language

// 언어 변경 시 HTML lang 속성도 갱신
i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng
})

export default i18n