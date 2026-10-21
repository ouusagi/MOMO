import { useNavigate } from "react-router-dom"
import Button from "../components/common/Button"
import Input from "../components/common/Input"
import { useRef, useState } from "react"
import inputIcon from "../assets/inputicon.png"
import DatePickerModal from "../components/common/DatePickerModal"
import CategoryIcon from "../components/common/CategoryIcon"
import { categories } from "../constants/categories"
import { useCreateExpenses } from "../hooks/useExpense"
import toast from "react-hot-toast"
import { runOCR } from "../components/ocr/ReceiptOCR"
import { parseReceiptText } from "../components/ocr/ocrParser"
import CameraIcon from "../assets/receiptIcons/Camera.svg"
import GalleryIcon from "../assets/receiptIcons/Gallery.svg"
import { useTranslation } from "react-i18next"

const EnterDirectly = () => {
    const navigate = useNavigate()
    const [amount, setAmount] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [memo, setMemo] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState('')
    const { mutate: createExpense } = useCreateExpenses()
    const { t } = useTranslation()

    const cameraInputRef = useRef<HTMLInputElement>(null)
    const albumInputRef = useRef<HTMLInputElement>(null)
    const [isOCRLoading, setIsOCRLoading] = useState(false)


    const handleReceiptChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
        setIsOCRLoading(true)

        const text = await runOCR(file)
        const result = parseReceiptText(text)

        if (result.title){
            setTitle(result.title)
        }

        if (result.amount){
            setAmount(result.amount)
        }

        if (result.date){
            setSelectedDate(result.date)
        }

        console.log("========== OCR 결과 ==========")
        console.log(text)
        console.log("==============================")

    } catch (error) {
        console.error("OCR 실패:", error)
    } finally {
        setIsOCRLoading(false)
    }
    }

    const handleSave = () => {
        if(!title || !amount || !selectedDate || !category){
        setError(t('enterDirectly.requiredFieldsError'))
        return
    }

    // 로컬 년-월-일 문자열 생성
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2,'0')
    const day = String(selectedDate.getDate()).padStart(2,'0')
    const expenseDate = `${year}-${month}-${day}`

    createExpense({ 
        amount:Number(amount.replaceAll(',','')), 
        title, 
        category, 
        memo, 
        expenseDate 
    }, {
    onSuccess:()=> {
        toast.success(t('enterDirectly.saveSuccess')); 
        navigate('/transactions');
    }, 
    onError:()=> {
        toast.error(t('enterDirectly.saveFailure')); 
        setError(t('enterDirectly.saveError'));
    }})
    setError('')
    }

    return(
        <div className="w-full min-h-screen bg-[#FFC4B3] flex flex-col">

            {/* 헤더 */}
            <div className='flex items-center justify-between px-5 pt-5 pb-4'>
                <Button className="" variant='back' onClick={() => navigate('/main')}>←</Button>
                <span className='text-[#3D2C2C] font-bold'>{t('enterDirectly.title')}</span>
                <span className='text-[#F47560] font-bold cursor-pointer' onClick={handleSave}>{t('enterDirectly.complete')}</span>
            </div>

            <div className='flex flex-col gap-4 px-4'>
                {/* 금액 입력 */}
                <div className='bg-white bg-opacity-60 rounded-3xl p-2 flex flex-col items-center gap-1'>
                    <span className='text-[#B89090] text-sm'>{t('enterDirectly.amountLabel')}</span>
                    <div className='flex items-center gap-1'>
                        <input type='text' value={amount === '' ? '' : Number(amount).toLocaleString()}
                            onChange={(e) => {
                                const raw = e.target.value.replaceAll(',', '')
                                if (/^\d*$/.test(raw)) setAmount(raw)
                            }}
                            placeholder='0'
                            className='text-3xl font-bold text-[#F47560] bg-transparent outline-none text-center w-48'
                        />
                        {amount !== '' && (<span className="text-3xl font-bold text-[#F47560] ml-1">{t('signup.currency')}</span>)}
                    </div>
                    <span className='text-[#B89090] text-xs'>{t('enterDirectly.amountEditHint')}</span>
                </div>

                {/* 가게명 */}
                <Input className="font-bold" label={t('enterDirectly.shopLabel')} type='text' placeholder={t('enterDirectly.shopPlaceholder')} value={title} onChange={(e) => setTitle(e.target.value)}/>

                {/* 메모 */}
                <Input className="font-bold" label={t('enterDirectly.memoLabel')} type='text' placeholder={t('enterDirectly.memoPlaceholder')} value={memo} onChange={(e) => setMemo(e.target.value)}/>

                {/* 날짜 */}
                <div className='bg-white bg-opacity-60 rounded-2xl px-4 py-3 mt-3 flex items-center justify-between' onClick={()=> setIsOpen(true)}>
                    <div>
                        <p className='text-[#B89090] text-xs'>{t('enterDirectly.dateLabel')}</p>
                        <p className='text-[#3D2C2C] font-bold text-sm'>{selectedDate.toLocaleDateString('ja-JP')}</p>
                    </div>
                    <img src={inputIcon} alt="input_icon" className="w-8" />
                </div>

                {/* 카테고리 */}
                <div>
                    <p className='text-[#7A5555] font-bold mb-3'>{t('enterDirectly.categoryTitle')}</p>
                    <div className='grid grid-cols-4 gap-3'>
                        {categories.map((cat) => (
                            <CategoryIcon
                                key={cat.value}
                                Icon={cat.Icon}
                                label={t(cat.labelKey)}
                                active={category === cat.value}
                                onClick={() => setCategory(cat.value)}
                                className="w-20 h-16"
                            />
                        ))}
                    </div>
                </div>

                {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

                <div className="flex justify-center gap-6">
                    <Button className="mt-2 flex-1 !flex flex-row items-center justify-center gap-2 whitespace-nowrap" variant="primary" onClick={()=> cameraInputRef.current?.click()}>{t('enterDirectly.receiptCapture')} <img src={CameraIcon} alt="CameraIcon" /></Button>
                    <Button className="mt-2 flex-1 !flex flex-row items-center justify-center gap-2 whitespace-nowrap" variant="primary" onClick={()=> albumInputRef.current?.click()}>{t('enterDirectly.selectPhoto')} <img src={GalleryIcon} alt="GalleryIcon" /></Button>

                    <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleReceiptChange} className="hidden"/>
                    <input ref={albumInputRef} type="file" accept="image/*" onChange={handleReceiptChange} className="hidden"/>
                </div>

                <p className="mt-2 text-xs text-center whitespace-pre-line text-[#857A78]">{t('enterDirectly.receiptNotice')}</p>

            </div>

            {isOCRLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="flex w-[280px] flex-col items-center rounded-2xl bg-white px-6 py-8 shadow-xl">
                    <div className="mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[#FFC4B3] border-t-[#F47560]" />
                    <p className="text-lg font-semibold text-[#5A2D2A]">{t('enterDirectly.ocrLoadingTitle')}</p>
                    <p className="mt-2 text-sm text-gray-500">{t('enterDirectly.ocrLoadingWait')}</p>
                    <p className="mt-1 text-xs text-center whitespace-pre-line text-gray-400">{t('enterDirectly.ocrAccuracyNotice')}</p>
                </div>
            </div>
            )}


            <DatePickerModal open={isOpen} selectedDate={selectedDate} onChange={setSelectedDate} onClick={() => setIsOpen(false)}/>
        </div>
        
    )
}
export default EnterDirectly