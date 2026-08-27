import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts"
import { useGetExpenses } from "../../hooks/useExpense"
import type { Expense } from "../../types/expense"
import "./ExpenseBarChartScrollBar.css"

interface CategoryDonutChartProps {
    period:string
}

export const CategoryDonutChart = ({period}:CategoryDonutChartProps) => {

    const { data:ChartData, isLoading:isChartDataLoading, error:ChartDataError } = useGetExpenses()
    const now = new Date()
    const periodLabel = {
        '週間': '今週',
        '月間': '今月',
        '年間': '今年'
    }[period]
    const COLORS = [
    '#A9C7F5', // pastel blue
    '#9DD9D7', // pastel teal
    '#B8D99A', // pastel green
    '#C5B3E6', // pastel purple
    '#E6B5D0', // pastel pink
    '#F0C6A4', // pastel peach
    '#A8D5BA', // pastel mint
    '#C7B8A3', // pastel beige
    // '#B8CCD9', // pastel mist blue
    // '#D8B4B8', // dusty rose
    // '#D5C6B1', // pastel taupe
    // '#C9C1E8', // periwinkle
    ]

    if(isChartDataLoading) return <p className="text-center">読み込み中...</p>
    if(ChartDataError) return <p>エラーが発生しました</p>


    // =========================
    // 주간 데이터 (월~일)
    // =========================
    const day = now.getDay()
    const diff = day === 0 ? -6 : 1 - day

    const monday = new Date(now)
    monday.setDate(now.getDate() + diff)
    monday.setHours(0,0,0,0)

    const sunday = new Date(monday)
    sunday.setDate(now.getDate() + 6)
    sunday.setHours(23,59,59,999)

    const weeklyExpenses = ChartData?.filter((expense)=>{
        const date = new Date(expense.expenseDate)
        return date >= monday && date <= sunday
    }) ?? []


    // =========================
    // 월간 데이터 (O월 1일~ O월 31일)
    // =========================
    const firstDay = new Date(now.getFullYear(),now.getMonth(),1)
    const lastDay = new Date(now.getFullYear(),now.getMonth() + 1,0)

    firstDay.setHours(0,0,0,0)
    lastDay.setHours(23,59,59,999)

    const monthlyExpenses = ChartData?.filter((expense)=>{
        const date = new Date(expense.expenseDate)
        return date >= firstDay && date <= lastDay
    }) ?? []


    // =========================
    // 연간 데이터
    // =========================
    const firstDayOfYear = new Date(now.getFullYear(),0,1)
    const lastDayOfYear = new Date(now.getFullYear() + 1,0,0)

    firstDayOfYear.setHours(0,0,0,0)
    lastDayOfYear.setHours(23,59,59,999)

    const yearlyExpenses = ChartData?.filter((expense)=>{
        const date = new Date(expense.expenseDate)
        return date >= firstDayOfYear && date <= lastDayOfYear
    }) ?? []


    // =========================
    // 카테고리별 금액 합산 함수
    // =========================
    const getCategoryData = (expense:Expense[]) => {
        return expense.reduce((acc, expense)=>{
            const existing = acc.find(item => item.category === expense.category)

            if(existing){
                existing.amount += expense.amount
            }

            else{
                acc.push({category:expense.category, amount:expense.amount})
            }

            return acc
        }, [] as {category:string, amount:number}[])
    }


    // =========================
    // 기간별 카테고리 데이터
    // =========================
    const weeklyCategoryData = getCategoryData(weeklyExpenses)
    const monthlyCategoryData = getCategoryData(monthlyExpenses)
    const yearlyCategoryData = getCategoryData(yearlyExpenses)


    // =========================
    // period에 따라 사용할 데이터
    // =========================
    const categoryData = period === '月間' ? monthlyCategoryData : period === '年間' ? yearlyCategoryData : weeklyCategoryData


    // =========================
    // 가장 높은 카테고리 금액
    // =========================
    const maxAmount = Math.max(...categoryData.map(item => item.amount))


    // =========================
    // 총 지출
    // =========================
    const totalAmount = categoryData.reduce((total, item) => total + item.amount,0)



    return(
        <div className="bg-white bg-opacity-65 rounded-3xl p-4">
            {/* header */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-[#3D2C2C] font-bold text-sm">
                    📊 {periodLabel}のカテゴリ別支出
                </span>

                <span className="text-[#F47560] font-bold text-sm">
                    {totalAmount.toLocaleString()}円
                </span>
            </div>

            {/* chart */}
            <div className="w-full h-40">
                {categoryData.length === 0 ? (<p className="text-center pt-12 text-[#B89090]">支出データがありません</p>) : (
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={categoryData} dataKey="amount" nameKey="category" cx="30%" cy="50%" paddingAngle={2} className="outline-none">
                        {categoryData.map((item, index) => (
                        <Cell key={item.category} fill={item.amount === maxAmount ? '#F47560' : COLORS[index % COLORS.length]}/>))}
                    </Pie>
                    <Tooltip contentStyle={{backgroundColor: '#FFF7F4', border: 'none', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',}}
                             labelStyle={{fontWeight: 700}} itemStyle={{fontWeight: 600}}
                             formatter={(value) => `${Number(value).toLocaleString()} 円`}/>
                        <Legend layout="vertical" verticalAlign="middle" align="right" 
                        wrapperStyle={{fontSize:'15px',fontWeight:600, lineHeight: '1.4'}}/>
                </PieChart>
                </ResponsiveContainer>)}
            </div>
        </div>
    )
}