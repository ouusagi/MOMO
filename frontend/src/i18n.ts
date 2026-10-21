import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ja from './locales/ja'
import ko from './locales/ko'

const language = navigator.language.startsWith('ko') ? 'ko' : 'ja'

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

export default i18n