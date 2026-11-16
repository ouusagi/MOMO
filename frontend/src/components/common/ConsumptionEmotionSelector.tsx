
import { useTranslation } from "react-i18next"
import { consumptionEmotionIcons } from "../../constants/consumption"
import type { ConsumptionEmotion } from '../../types/expense'

interface Props {
    value: ConsumptionEmotion | undefined
    onChange: (value: ConsumptionEmotion | undefined) => void
}

const emotions: { value: ConsumptionEmotion; label: string }[] = [
    { value: 'happy', label: 'happy' },
    { value: 'satisfied', label: 'satisfied' },
    { value: 'relaxed', label: 'relaxed' },
    { value: 'excited', label: 'excited' },
    { value: 'sad', label: 'sad' },
    { value: 'stressed', label: 'stressed' },
]

const ConsumptionEmotionSelector = ({ value, onChange }: Props) => {
    const { t } = useTranslation()

    return (
        <div>
            <p className="text-[#7A5555] font-bold mb-3">
                {t('enterDirectly.consumptionEmotionTitle')}
                <span className="text-[#B89090] text-xs font-normal ml-2">
                    {t('enterDirectly.optional')}
                </span>
            </p>

            <div className="grid grid-cols-3 gap-3">
                {emotions.map((item) => {
                    const active = value === item.value

                    return (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => onChange(active ? undefined : item.value)}
                            className={`
                                h-20 rounded-2xl flex flex-col items-center justify-center gap-1
                                transition-all duration-200
                                ${active
                                    ? 'bg-[#FFE3DA] border-2 border-[#F47560] shadow-sm'
                                    : 'bg-white/60 border-2 border-transparent'
                                }
                            `}
                        >
                            <span>
                            <img src={consumptionEmotionIcons[item.value]} width={20} height={20}/>
                            </span>
                            
                            <span className="text-xs font-bold text-[#3D2C2C]">
                                {t(`enterDirectly.consumptionEmotions.${item.value}`)}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default ConsumptionEmotionSelector
