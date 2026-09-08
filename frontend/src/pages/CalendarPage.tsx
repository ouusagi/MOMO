import { useNavigate } from "react-router-dom"
import Button from "../components/common/Button"
import NavBottom from "../components/common/NavBottom"
import transactionsBell from "../assets/transactionsBell.png"
import { useGetExpenses } from "../hooks/useExpense"
import { useEffect, useState } from "react"
import { useGetUser } from "../hooks/useUser"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "../components/common/DatePickerModal.css"
import { ja } from "date-fns/locale"
import Card from "../components/common/Card"
import { categoryIcons } from "../constants/categoryIcons"



const CalendarPage = () => {

    const navigate = useNavigate()
    const { data:ExpensesData, isLoading:ExpensesLoading, error:ExpensesError } = useGetExpenses()
    const { data:UserBudGet } = useGetUser()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [viewDate, setViewDate] = useState(new Date())


    // 로컬 '년-월-일' 형태 문자열 생성 
    const getLocalDateString = (date:Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2,'0')
        const day = String(date.getDate()).padStart(2,'0')

        return `${year}-${month}-${day}`
    }

    // 이번 달 지출 
    const monthlyExpenses = ExpensesData?.filter((expense)=>{
        const [year, month] = expense.expenseDate.split("-").map(Number)
        return(year === viewDate.getFullYear() && month === viewDate.getMonth() + 1)
    }) ?? []

    // 이번 달 지출 총합
    const monthlyTotal = monthlyExpenses.reduce((total, expense)=> total + expense.amount, 0)

    // 이번 달 예산 잔액 계산
    const remainingBudget = UserBudGet?.budget - monthlyTotal


    // 선택한 날짜의 문자열 변환 & 선택한 날짜만 필터링
    const selectedDateString = getLocalDateString(selectedDate)
    const selectedExpenses = ExpensesData?.filter((expense) => {
        return expense.expenseDate.slice(0,10) === selectedDateString
    })


    // 해당 날짜에 지출 있는지 확인
    const hasExpense = (date:Date) => {
        const dataString = getLocalDateString(date)
        return ExpensesData?.some((expense)=> expense.expenseDate.slice(0,10) === dataString)
    }


    // 프레임 단위 카운트업 애니메이션
    const [displayTotal, setDisplayTotal] = useState(0)

    useEffect(() => {
    const duration = 600
    const start = performance.now()

    const animate = (time: number) => {
        const progress = Math.min((time - start) / duration, 1)
        const value = Math.floor(monthlyTotal * progress)

        setDisplayTotal(value)

        if (progress < 1) {
            requestAnimationFrame(animate)
        }
    }

    requestAnimationFrame(animate)

    }, [monthlyTotal])

    if(ExpensesLoading) return <p>読み込み中...</p>
    if(ExpensesError) return <p>エラーが発生しました。</p>
    if(!ExpensesData) return <p>ユーザー情報が見つかりません。</p>


    return(
        <div className="w-full min-h-screen bg-gradient-to-b from-[#FFC3B6] to-[#F8A1A1CC] flex flex-col pb-24">
            
            {/* header */}
            <div className="flex items-center justify-between px-6 pt-12 pb-4">
                <Button variant="back" onClick={() => navigate("/main")}>←</Button>
                <span className="text-[#3D2C2C] font-bold">カレンダー</span>
                <Button variant="back" onClick={() => navigate("/main")}><img src={transactionsBell} alt="bell-img"/></Button>
            </div>

            {/* 이번 달 지출 요약 */}
            <div className="px-6 pt-1">
                <div className="bg-[#F47560] rounded-3xl px-4 py-5 text-white">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm">{viewDate.getMonth()+1}月の総支出</p>
                            <p className="text-3xl font-bold">{displayTotal.toLocaleString()}円</p>
                        </div>

                        <div className="text-right text-sm">
                            <p>予算 {UserBudGet?.budget.toLocaleString()}円</p>
                            <p>残額</p>
                            <p className="font-bold">¥{remainingBudget.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <div className="px-6 py-4">
                <div className="bg-[#FFE6DE] rounded-3xl p-6 flex justify-center">
                    <DatePicker inline locale={ja} selected={selectedDate} onChange={(date)=>{
                        if(!date) return 
                        setSelectedDate(date)}}
                        onMonthChange={(date)=>{setViewDate(date)}}
                        maxDate={new Date()}
                        renderDayContents={(day, date)=>{
                            const expenseExists = hasExpense(date)
                            return(
                                <div className="flex flex-col items-center justify-center relative">
                                    <span>{day}</span>
                                    {expenseExists && (<span className="w-1.5 h-1.5 bg-[#F47560] rounded-full absolute -bottom-1.5" />)}
                                </div>
                            )
                        }}/>
                </div>
            </div>

            {/* SelectDateExpenses */}
            <div className="px-7">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[#7A5555] font-bold">
                        {selectedDate.getMonth() + 1}月
                        {selectedDate.getDate()}日の支出
                    </span>

                    <span onClick={()=> navigate('/transactions')} className="text-[#F47560] opacity-80 font-bold">全て見る ›</span>
                </div>

                <div className="flex flex-col gap-3">{selectedExpenses.length === 0 ? (<p className="text-[#B89090] text-sm text-center pt-10">この日の支出はありません！</p>) : 
                (selectedExpenses.map((item)=>(
                    <Card key={item.id} title={item.title} amount={item.amount} memo={item.memo} icon={categoryIcons[item.category]} onClick={()=> navigate(`/transaction/${item.id}`)}/>
                )))}</div>
            </div>

            <div className="fixed bottom-0 left-0 right-0">
                <NavBottom/>       
            </div>
        </div>
    )
}

export default CalendarPage