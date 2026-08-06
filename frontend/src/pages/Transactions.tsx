import { useNavigate } from "react-router-dom"
import Button from "../components/common/Button"
import transactionsBell from "../assets/transactionsBell.png"
import { useState } from "react"
import { useGetExpenses } from "../hooks/useExpense"
import NavBottom from "../components/common/NavBottom"
import Card from "../components/common/Card"
import { categoryEmoji } from "../constants/categoryEmoji"

const Transactions = () => {

    const navigate = useNavigate()
    const categoryfilters = ['すべて', '食費', 'カフェ', '交通', '買い物', '医薬品', '趣味' ,'その他']
    const [activeFilter, setActiveFilter] = useState('すべて')
    const { data:ExpensesData, isLoading:ExpensesLoading, error:ExpensesError } = useGetExpenses()

    const Last30DaysExpenses = ExpensesData?.filter((expense)=>{
        const date = new Date(expense.expenseDate)
        const now = new Date()
        const past = new Date()
        past.setDate(now.getDate() - 30)
        return date >= past && date <= now
    }).sort((a,b)=>{
        return new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime()
    })

    const FilteredExpenses = Last30DaysExpenses?.filter((expense)=>{
        if(activeFilter === 'すべて'){
            return true
        }
        return expense.category === activeFilter
    })

    const groupedExpenses = FilteredExpenses?.reduce((acc, expense)=> {
        const date = expense.expenseDate.slice(0,10)

        if(!acc[date]){
            acc[date] = []
        }

        acc[date].push(expense)
        return acc
    },{} as Record<string, typeof FilteredExpenses>)

    const getDateLabel = (dateStr: string) => {
        const today = new Date().toISOString().slice(0,10)
        const yesterdayDate = new Date()
        yesterdayDate.setDate(yesterdayDate.getDate() - 1)
        const yesterday = yesterdayDate.toISOString().slice(0,10)

        if (dateStr === today) return "今日"
        if (dateStr === yesterday) return "昨日"

        return dateStr
    }

    
    return(
        <div className='w-full min-h-screen bg-[#FFC4B3] flex flex-col pb-24'>
            
            {/* header */}
            <div className='flex items-center justify-between px-6 pt-12 pb-4'>
                <Button className="" variant='back' onClick={() => navigate('/main')}>←</Button>
                <span className='text-[#3D2C2C] font-bold'>全履歴</span>
                <Button className="" variant="back" onClick={() => navigate('/main')}><img src={transactionsBell} alt="bell-img" /></Button>
            </div>

            {/* category */}
            <div className="flex gap-2 px-6 py-3 overflow-x-auto">
                {categoryfilters?.map((filter)=> {
                    return(
                        <Button variant="filter" key={filter} className={`${activeFilter === filter ? 'bg-[#F47560] text-white' : 'bg-white bg-opacity-65 text-[#7A5555]'}`} onClick={()=> {setActiveFilter(filter)}}>{filter}</Button>
                    )
                })}
            </div>

            {/* CardBox */}
            <div className="flex flex-col gap-4 px-6 py-3">
                {ExpensesLoading ? (<p className='text-center text-[#B89090]'>読み込み中...</p>) : ExpensesError ? (<p className='text-center text-[#B89090]'>エラーが発生しました</p>) : 
                ( Object.entries(groupedExpenses ?? {}).map(([date, expenses])=>(
                    <div key={date}>
                        <p className="text-[#7A5555] font-bold">{getDateLabel(date)}</p>

                        {expenses.map((item, index)=>(
                            <div key={index} className="mt-2 mb-3">
                            <Card title={item.title} emoji={categoryEmoji[item.category] ?? "💰"} memo={item.memo} amount={item.amount} onClick={()=>{navigate(`/transaction/${item.id}`)}}/>
                            </div>
                        ))}
                    </div>
                )))}
            </div>

            {/* BottomNav */}
            <div className='fixed bottom-0 left-0 right-0'>
                <NavBottom />
            </div>

        </div>
    )
}

export default Transactions