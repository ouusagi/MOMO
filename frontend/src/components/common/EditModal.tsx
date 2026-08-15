import { useEffect, useState } from 'react'
import Button from './Button'
import Input from './Input'
import inputIcon from '../../assets/inputicon.png'
import DatePickerModal from './DatePickerModal'

interface EditModalProps {
    isOpen: boolean
    onClose: () => void
    onSave?: (data: { title: string; amount: number; memo: string; expenseDate: string; }) => void
    initialData?: {title: string; amount: number; memo: string; date: string;}
}

const EditModal = ({ isOpen, onClose, onSave, initialData }: EditModalProps) => {

    const [title, setTitle] = useState(initialData.title)
    const [amount, setAmount] = useState(initialData.amount.toString())
    const [memo, setMemo] = useState(initialData.memo || '')
    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date(initialData?.date))
    const [dateModal, setDateModal] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        if(isOpen){
            setTimeout(() => setShow(true),10)
        }
        else{setShow(false)}
    },[isOpen])

    if (!isOpen) return null

    const handleSave = () => {

        if(!title || !amount){
        return setError('内容を入力してください')
        }

        setError('')
        onSave({title, amount: Number(amount.replaceAll(',', '')), memo, expenseDate:selectedDate.toISOString()})
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex items-end justify-center z-50'>
            <div className='absolute inset-0' onClick={onClose} />

            <div className={`relative bg-[#FFD9CE] rounded-t-3xl p-6 w-full flex flex-col gap-4 shadow-lg transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}>

                {/* header */}
                <div className='flex items-center justify-between mb-2'>
                    <Button className="" variant='back' onClick={onClose}>←</Button>
                    <span className='text-[#3D2C2C] font-bold'>支出修正</span>
                    <span className='text-[#F47560] font-bold cursor-pointer' onClick={handleSave}>保存</span>
                </div>

                {/* input */}
                <Input label='店名' type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='店名'/>

                <div className='flex flex-col gap-1'>
                    <label className='text-[#7A5555] font-bold'>金額</label>
                    <input
                        type='text'
                        value={amount === '' ? '' : Number(amount.replaceAll(',', '')).toLocaleString()}
                        onChange={(e) => {
                            const raw = e.target.value.replaceAll(',', '')
                            if (/^\d*$/.test(raw)) setAmount(raw)
                        }}
                        placeholder='0'
                        className='rounded-xl outline-none border-none py-4 px-3 bg-[#FFFFFF] bg-opacity-75 text-[#3D2C2C]'
                    />
                </div>

                <Input label='メモ（任意）' type='text' value={memo} onChange={(e) => setMemo(e.target.value)} placeholder='メモを入力してください'/>

                {/* Date */}
                <div className='flex flex-col mb-1'>
                <label className='text-[#7A5555] font-bold -mb-1.5'>日付</label>
                <div className='bg-white bg-opacity-60 rounded-2xl px-4 py-3 mt-3 flex items-center justify-between' onClick={()=> setDateModal(true)}>
                    <div>
                        <p className='text-[#B89090] text-xs'>日付 (タップして編集)</p>
                        <p className='text-[#3D2C2C] font-bold text-sm'>{selectedDate.toLocaleDateString('ja-JP')}</p>
                    </div>
                    <img src={inputIcon} alt="input_icon" className="w-8" />
                </div>
                </div>

                <p className='text-red-500 text-sm text-center'>{error}</p>

                <Button variant='primary' fullWidth onClick={handleSave} className='mt-2 pb-4'>保存する</Button>

                <DatePickerModal open={dateModal} selectedDate={selectedDate} onChange={setSelectedDate} onClick={() => setDateModal(false)}/>
            </div>
        </div>
    )
}

export default EditModal