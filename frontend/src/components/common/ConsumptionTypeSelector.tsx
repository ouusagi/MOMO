
import { useTranslation } from "react-i18next"
import { consumptionTypeIcons } from "../../constants/consumption"
import type { ConsumptionType } from '../../types/expense'

interface Props {
    value: ConsumptionType | undefined
    onChange: (value: ConsumptionType | undefined) => void
}

const consumptionTypes: { value: ConsumptionType; label: string }[] = [
    { value: 'mood', label: 'mood' },
    { value: 'impulse', label: 'impulse' },
    { value: 'necessary', label: 'necessary' },
    { value: 'reward', label: 'reward' },
]

const ConsumptionTypeSelector = ({ value, onChange }: Props) => {
    const { t } = useTranslation()

    return (
        <div>
            <p className="text-[#7A5555] font-bold mb-3">
                {t('enterDirectly.consumptionTypeTitle')}
                <span className="text-[#B89090] text-xs font-normal ml-2">
                    {t('enterDirectly.optional')}
                </span>
            </p>

            <div className="grid grid-cols-2 gap-3">
                {consumptionTypes.map((item) => {
                    const active = value === item.value

                    return (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => onChange(active ? undefined : item.value)}
                            className={`
                                h-16 rounded-2xl flex items-center justify-center gap-2
                                transition-all duration-200
                                ${active
                                    ? 'bg-[#FFE3DA] border-2 border-[#F47560] shadow-sm'
                                    : 'bg-white/60 border-2 border-transparent'
                                }
                            `}
                        >
                            <span>
                            <img src={consumptionTypeIcons[item.value]} width={20} height={20}/>
                            </span>
                            
                            <span className="text-sm font-bold text-[#3D2C2C]">
                                {t(`enterDirectly.consumptionTypes.${item.label}`)}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default ConsumptionTypeSelector
