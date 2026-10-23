import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import i18n from '../i18n'

const LanguageSelect = () => {
  const navigate = useNavigate()
  const [selectedLanguage, setSelectedLanguage] = useState<'ja' | 'ko' | null>(null)

  const handleLanguageSelect = async () => {
    if (!selectedLanguage) return

    await i18n.changeLanguage(selectedLanguage)

    localStorage.setItem('language', selectedLanguage)

    document.documentElement.lang = selectedLanguage

    navigate('/', { replace: true })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FFF8F5] px-6 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-wide text-[#F47560]">MOMO</h1>

          <p className="mt-5 text-xl font-semibold text-[#3D2C2C]">言語を選択してください</p>

          <p className="mt-2 text-sm text-[#8B7773]">사용할 언어를 선택해 주세요</p>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setSelectedLanguage('ja')}
            className={`flex w-full items-center justify-between rounded-2xl border-2 bg-white p-5 text-left transition ${
              selectedLanguage === 'ja'
                ? 'border-[#F47560] shadow-md'
                : 'border-[#F3E5E0]'
            }`}
          >
            <div>
              <p className="text-lg font-semibold text-[#3D2C2C]">🇯🇵 日本語</p>
              <p className="mt-1 text-sm text-[#8B7773]">日本語で利用する</p>
            </div>

            <span className="text-xl text-[#F47560]">{selectedLanguage === 'ja' ? '●' : '○'}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedLanguage('ko')}
            className={`flex w-full items-center justify-between rounded-2xl border-2 bg-white p-5 text-left transition ${
              selectedLanguage === 'ko'
                ? 'border-[#F47560] shadow-md'
                : 'border-[#F3E5E0]'
            }`}
          >
            <div>
              <p className="text-lg font-semibold text-[#3D2C2C]">🇰🇷 한국어</p>
              <p className="mt-1 text-sm text-[#8B7773]">한국어로 사용하기</p>
            </div>

            <span className="text-xl text-[#F47560]">
              {selectedLanguage === 'ko' ? '●' : '○'}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleLanguageSelect}
          disabled={!selectedLanguage}
          className="mt-8 w-full rounded-2xl bg-[#F47560] py-4 font-semibold text-white transition hover:bg-[#E96853] disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </main>
  )
}

export default LanguageSelect