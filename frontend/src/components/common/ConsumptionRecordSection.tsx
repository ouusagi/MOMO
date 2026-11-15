
import { useState } from "react"
import { useTranslation } from "react-i18next"
import ConsumptionTypeSelector from "./ConsumptionTypeSelector"
import ConsumptionEmotionSelector from "./ConsumptionEmotionSelector"
import ThinkingIcon from "../../assets/consumptionIcons/Thinking.svg"
import type { ConsumptionType, ConsumptionEmotion } from '../../types/expense'

interface Props {
    consumptionType: ConsumptionType
    setConsumptionType: (value: ConsumptionType | undefined) => void
    consumptionEmotion: ConsumptionEmotion
    setConsumptionEmotion: (value: ConsumptionEmotion | undefined) => void
}

const ConsumptionRecordSection = ({
    consumptionType,
    setConsumptionType,
    consumptionEmotion,
    setConsumptionEmotion,
}: Props) => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-white/60 rounded-2xl overflow-hidden">
            {/* 접기 / 펼치기 헤더 */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-4"
            >
                <div className="flex flex-col items-start gap-1">
                    <span className="text-[#7A5555] font-bold">
                        <div className="flex gap-2">
                        <img src={ThinkingIcon} alt=""className="w-5 h-6"/>
                        {t('enterDirectly.consumptionRecordTitle')}
                        </div>
                    </span>

                    <span className="text-[#B89090] text-xs">
                        {t('enterDirectly.consumptionRecordDescription')}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {(consumptionType || consumptionEmotion) && (
                        <span className="text-[#F47560] text-xs font-bold">
                            {t('enterDirectly.recordSelected')}
                        </span>
                    )}

                    <span
                        className={`text-[#7A5555] transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    >
                        ▼
                    </span>
                </div>
            </button>

            {/* 선택 영역 */}
            {isOpen && (
                <div className="px-4 pb-4 flex flex-col gap-5">
                    <ConsumptionTypeSelector
                        value={consumptionType}
                        onChange={setConsumptionType}
                    />

                    <ConsumptionEmotionSelector
                        value={consumptionEmotion}
                        onChange={setConsumptionEmotion}
                    />
                </div>
            )}
        </div>
    )
}

export default ConsumptionRecordSection
