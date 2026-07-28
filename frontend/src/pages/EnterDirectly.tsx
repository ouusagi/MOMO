import { useNavigate } from "react-router-dom"
import Button from "../components/common/Button"
import Input from "../components/common/Input"
import { useState } from "react"
import inputIcon from "../assets/inputicon.png"
import DatePickerModal from "../components/common/DatePickerModal"
import CategoryIcon from "../components/common/CategoryIcon"


const categories = [
    { emoji: '☕', label: 'カフェ' },
    { emoji: '🍔', label: '食費' },
    { emoji: '🛍', label: '買い物' },
    { emoji: '🚇', label: '交通' },
    { emoji: '🏠', label: '家賃' },
    { emoji: '💊', label: '医薬品' },
    { emoji: '🎮', label: '趣味' },
]

const EnterDirectly = () => {
    const navigate = useNavigate()
    const [amount, setAmount] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState('')

    const handleSave = () => {
        if(!title || !amount || !selectedDate || !category){
        setError("全ての項目を入力してください")
        return
    }
    }

    return(
        <div className="w-full min-h-screen bg-[#FFC4B3] flex flex-col">

            {/* 헤더 */}
            <div className='flex items-center justify-between px-6 pt-5 pb-4'>
                <Button className="" variant='back' onClick={() => navigate('/main')}>←</Button>
                <span className='text-[#3D2C2C] font-bold'>手動入力</span>
                <span className='text-[#F47560] font-bold cursor-pointer'onClick={()=> {}}>完了</span>
            </div>

            <div className='flex flex-col gap-4 px-4'>
                {/* 금액 입력 */}
                <div className='bg-white bg-opacity-60 rounded-3xl p-2 flex flex-col items-center gap-1'>
                    <span className='text-[#B89090] text-sm'>金額</span>
                    <div className='flex items-center gap-1'>
                        <input type='text' value={amount === '' ? '' : Number(amount).toLocaleString()}
                            onChange={(e) => {
                                const raw = e.target.value.replaceAll(',', '')
                                if (/^\d*$/.test(raw)) setAmount(raw)
                            }}
                            placeholder='0'
                            className='text-3xl font-bold text-[#F47560] bg-transparent outline-none text-center w-48'
                        />
                        {amount !== '' && (<span className="text-3xl font-bold text-[#F47560] ml-1">円</span>)}
                    </div>
                    <span className='text-[#B89090] text-xs'>タップして編集</span>
                </div>

                {/* 가게명 */}
                <Input className="font-bold" label='店名' type='text' placeholder='ドン・キホーテ' value={title} onChange={(e) => setTitle(e.target.value)}/>

                {/* 날짜 */}
                <div className='bg-white bg-opacity-60 rounded-2xl px-4 py-3 flex items-center justify-between' onClick={()=> setIsOpen(true)}>
                    <div>
                        <p className='text-[#B89090] text-xs'>日付 (タップして編集)</p>
                        <p className='text-[#3D2C2C] font-bold text-sm'>{selectedDate.toLocaleDateString('ja-JP')}</p>
                    </div>
                    <img src={inputIcon} alt="input_icon" className="w-8" />
                </div>

                {/* 카테고리 */}
                <div>
                    <p className='text-[#7A5555] font-bold mb-3'>カテゴリを選ぶ</p>
                    <div className='grid grid-cols-4 gap-3'>
                        {categories.map((cat) => (
                            <CategoryIcon
                                key={cat.label}
                                emoji={cat.emoji}
                                label={cat.label}
                                active={category === cat.label}
                                onClick={() => setCategory(cat.label)}
                                className="w-20 h-20"
                            />
                        ))}
                        <CategoryIcon emoji='+' label='' onClick={() => {}} className="w-20 h-20"/>
                    </div>
                </div>

                {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

                <Button className="mt-2" variant="outline" onClick={()=> navigate("/camera")}>レシート撮影 📸</Button>
                <Button variant='primary' fullWidth onClick={handleSave} className='mt-2'>保存する</Button>

            </div>







            <DatePickerModal open={isOpen} selectedDate={selectedDate} onChange={setSelectedDate} onClick={() => setIsOpen(false)}/>
        </div>
        
    )
}
export default EnterDirectly