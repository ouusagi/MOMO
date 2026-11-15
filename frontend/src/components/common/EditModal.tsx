import { useEffect, useState } from 'react'
import Button from './Button'
import inputIcon from '../../assets/inputicon.png'
import DatePickerModal from './DatePickerModal'
import { useTranslation } from 'react-i18next'
import { consumptionTypeIcons, consumptionEmotionIcons } from '../../constants/consumption'


import { detailIcons } from "../../constants/detailIcons"
import PeachCharacter from '../../assets/MomoSave.png'

import type { ConsumptionType, ConsumptionEmotion } from '../../types/expense'

interface EditModalProps {
    isOpen: boolean
    onClose: () => void
    onSave?: (data: {
        title: string
        amount: number
        memo: string
        expenseDate: string
        consumptionType?: ConsumptionType
        consumptionEmotion?: ConsumptionEmotion
    }) => void
    initialData?: {
        title: string
        amount: number
        memo: string
        date: string
        consumptionType?: ConsumptionType
        consumptionEmotion?: ConsumptionEmotion
    }
}

const typeOptions: ConsumptionType[] = ['mood', 'impulse', 'necessary', 'reward']
const emotionOptions: ConsumptionEmotion[] = ['happy', 'satisfied', 'relaxed','excited', 'sad', 'stressed']

const EditModal = ({ isOpen, onClose, onSave, initialData }: EditModalProps) => {
    const { t } = useTranslation()
    const [title, setTitle] = useState(initialData?.title ?? '')
    const [amount, setAmount] = useState(initialData?.amount.toString() ?? '')
    const [memo, setMemo] = useState(initialData?.memo ?? '')
    const [selectedDate, setSelectedDate] = useState(() => new Date(initialData?.date ?? new Date()))

    const [consumptionType, setConsumptionType] = useState<ConsumptionType | undefined>(
        initialData?.consumptionType
    )
    const [consumptionEmotion, setConsumptionEmotion] = useState<ConsumptionEmotion | undefined>(
        initialData?.consumptionEmotion
    )

    const [activeSelector, setActiveSelector] = useState<'type' | 'emotion' | null>(null)
    const [dateModal, setDateModal] = useState(false)
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (isOpen) {
            setTitle(initialData?.title ?? '')
            setAmount(initialData?.amount.toString() ?? '')
            setMemo(initialData?.memo ?? '')
            setSelectedDate(new Date(initialData?.date ?? new Date()))
            setConsumptionType(initialData?.consumptionType)
            setConsumptionEmotion(initialData?.consumptionEmotion)
            setActiveSelector(null)
            setError('')
            const timer = setTimeout(() => setShow(true), 10)
            return () => clearTimeout(timer)
        } else {
            setShow(false)
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleSave = () => {
        if (!title.trim() || !amount) {
            setError(t('editModal.requiredFieldsError'))
            return
        }

        if (!onSave) return

        setError('')

        onSave({
            title,
            amount: Number(amount.replaceAll(',', '')),
            memo,
            expenseDate: selectedDate.toISOString(),
            consumptionType,
            consumptionEmotion
        })
    }

    const inputClass =
        'w-full rounded-2xl bg-[#FFF5F2] px-4 py-4 text-[#7A5555] outline-none border border-transparent focus:border-[#F4A99C] transition-colors'

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
            <div className="absolute inset-0" onClick={onClose} />

            <div
                className={`relative flex w-full max-h-[92dvh] flex-col rounded-t-[32px] bg-[#FFF0EC] shadow-xl transition-transform duration-300 ${
                    show ? 'translate-y-0' : 'translate-y-full'
                }`}
            >

                <div className="flex justify-center pt-3">
                    <div className="h-1.5 w-12 rounded-full bg-[#E9C5BF]" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4">
                    <Button variant="back" onClick={onClose}>←</Button>
                    <span className="font-bold text-lg text-[#3D2C2C]">{t('editModal.title')}</span>

                    <button type="button" onClick={handleSave} className="font-bold text-[#F47560]">
                        {t('editModal.save')}
                    </button>
                </div>

                {/* 스크롤 가능한 내용 */}
                <div className="flex-1 overflow-y-auto px-5 pb-5">

                    <div className="rounded-[28px] bg-white/75 p-4 shadow-sm">

                        {/* 소비 유형 / 감정 카드 */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button type="button"
                                onClick={() => setActiveSelector(
                                    activeSelector === 'type' ? null : 'type'
                                )}
                                className="rounded-2xl bg-[#FFE9E4] p-3 text-left"
                            >
                                <p className="mb-3 text-sm font-bold text-[#7A5555]">
                                    {t('enterDirectly.consumptionTypeTitle')}
                                </p>

                                <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-3">
                                    {consumptionType && (
                                        <img src={consumptionTypeIcons[consumptionType]} className="h-7 w-7 shrink-0"/>
                                    )}
                                    <span className="min-w-0 flex-1 truncate text-xs font-bold text-[#7A5555]">
                                        {consumptionType
                                            ? t(`enterDirectly.consumptionTypes.${consumptionType}`)
                                            : t('enterDirectly.optional')}
                                    </span>
                                    <span className="text-[#B89090]">›</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveSelector(
                                    activeSelector === 'emotion' ? null : 'emotion'
                                )}
                                className="rounded-2xl bg-[#FFE9E4] p-3 text-left"
                            >
                                <p className="mb-3 text-sm font-bold text-[#7A5555]">
                                    {t('enterDirectly.consumptionEmotionTitle')}
                                </p>

                                <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-3">
                                    {consumptionEmotion && (
                                        <img
                                            src={consumptionEmotionIcons[consumptionEmotion]}
                                            className="h-7 w-7 shrink-0"
                                        />
                                    )}
                                    <span className="min-w-0 flex-1 truncate text-xs font-bold text-[#7A5555]">
                                        {consumptionEmotion
                                            ? t(`enterDirectly.consumptionEmotions.${consumptionEmotion}`)
                                            : t('enterDirectly.optional')}
                                    </span>
                                    <span className="text-[#B89090]">›</span>
                                </div>
                            </button>
                        </div>

                        {/* 소비 유형 선택 */}
                        {activeSelector === 'type' && (
                            <div className="mb-6 grid grid-cols-2 gap-2">
                                {typeOptions.map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => {
                                            setConsumptionType(
                                                consumptionType === type ? undefined : type
                                            )
                                            setActiveSelector(null)
                                        }}
                                        className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-bold ${
                                            consumptionType === type
                                                ? 'border-[#F47560] bg-[#FFE2DE] text-[#F47560]'
                                                : 'border-[#F5D8D2] bg-white text-[#7A5555]'
                                        }`}
                                    >
                                        <img src={consumptionTypeIcons[type]} className="h-6 w-6" />
                                        {t(`enterDirectly.consumptionTypes.${type}`)}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* 소비 감정 선택 */}
                        {activeSelector === 'emotion' && (
                            <div className="mb-6 grid grid-cols-2 gap-2">
                                {emotionOptions.map(emotion => (
                                    <button
                                        key={emotion}
                                        type="button"
                                        onClick={() => {
                                            setConsumptionEmotion(
                                                consumptionEmotion === emotion ? undefined : emotion
                                            )
                                            setActiveSelector(null)
                                        }}
                                        className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-bold ${
                                            consumptionEmotion === emotion
                                                ? 'border-[#F47560] bg-[#FFE2DE] text-[#F47560]'
                                                : 'border-[#F5D8D2] bg-white text-[#7A5555]'
                                        }`}
                                    >
                                        <img src={consumptionEmotionIcons[emotion]} className="h-6 w-6" alt="" />
                                        {t(`enterDirectly.consumptionEmotions.${emotion}`)}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* 가게명 */}
                        <div className="mb-5">
                            <div className='flex items-center gap-1.5 mb-2'>
                                <img src={detailIcons.store} width={20} height={20} />
                            <label className="font-bold text-sm text-[#7A5555]">
                                {t('editModal.shopName')}
                            </label>
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder={t('enterDirectly.shopPlaceholder')}
                                className={inputClass}
                            />
                        </div>

                        {/* 금액 */}
                        <div className="mb-5">
                            <div className='flex items-center gap-1.5 mb-2'>
                                <img src={detailIcons.coins} width={20} height={20}/>
                            <label className="font-bold text-sm text-[#7A5555]">
                                {t('editModal.amount')}
                            </label>
                            </div>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={amount === '' ? '' : Number(amount.replaceAll(',', '')).toLocaleString()}
                                onChange={e => {
                                    const raw = e.target.value.replaceAll(',', '')
                                    if (/^\d*$/.test(raw)) setAmount(raw)
                                }}
                                placeholder="0"
                                className={inputClass}
                            />
                        </div>

                        {/* 메모 */}
                        <div className="mb-5">
                            <div className='flex items-center gap-1.5 mb-2'>
                                <img src={detailIcons.memo} width={18} height={18} />
                            <label className="font-bold text-sm text-[#7A5555]">
                                {t('editModal.memoLabel')}
                            </label>
                            </div>
                            <textarea
                                value={memo}
                                onChange={e => setMemo(e.target.value)}
                                placeholder={t('editModal.memoPlaceholder')}
                                rows={3}
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        {/* 날짜 */}
                        <div>
                            <div className='flex items-center gap-1.5 mb-2'>
                                <img src={detailIcons.date} width={18} height={18} />
                            <label className="font-bold text-sm text-[#7A5555]">
                                {t('editModal.date')}
                            </label>
                            </div>
                            <button
                                type="button"
                                onClick={() => setDateModal(true)}
                                className="flex w-full items-center justify-between rounded-2xl bg-[#FFF5F2] px-4 py-3 text-left"
                            >
                                <div>
                                    <p className="text-xs text-[#B89090]">{t('editModal.dateEditHint')}</p>
                                    <p className="mt-1 text-sm font-bold text-[#7A5555]">{selectedDate.toLocaleDateString('ja-JP')}</p>
                                </div>
                                <img src={inputIcon} className="w-8" />
                            </button>
                        </div>
                    </div>

                    {error && (<p className="mt-3 text-center text-sm text-red-500">{error}</p>)}

                {/* 일러스트 포인트 영역 */}
                <div className="relative mt-5 h-24">
                    <img src={PeachCharacter} alt="MOMO" className="absolute bottom-[-80px] right-[-30px] w-52 h-auto object-contain"/>
                </div>

                </div>

                {/* 하단 저장 버튼 */}
                <div className="shrink-0 bg-[#FFF0EC] px-6 pb-[max(20px,env(safe-area-inset-bottom))] pt-3">
                    <Button variant="primary" fullWidth onClick={handleSave}>
                        {t('editModal.saveButton')}
                    </Button>
                </div>

                <DatePickerModal
                    open={dateModal}
                    selectedDate={selectedDate}
                    onChange={setSelectedDate}
                    onClick={() => setDateModal(false)}
                />
            </div>
        </div>
    )
}

export default EditModal
