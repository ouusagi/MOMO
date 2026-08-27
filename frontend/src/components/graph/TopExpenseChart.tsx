import { useGetExpenses } from "../../hooks/useExpense"
import type { Expense } from "../../types/expense"

interface TopExpenseChartProps {
    period: string
}

export const TopExpenseChart = ({ period }: TopExpenseChartProps) => {

    const { data: ChartData, isLoading: isChartDataLoading, error: ChartDataError } = useGetExpenses()
    const now = new Date()

    if (isChartDataLoading) return <p className="text-center">読み込み中...</p>
    if (ChartDataError) return <p>エラーが発生しました</p>
    

    // =========================
    // 주간 데이터 (월~일)
    // =========================
    const day = now.getDay()
    const diff = day === 0 ? -6 : 1 - day

    const monday = new Date(now)
    monday.setDate(now.getDate() + diff)
    monday.setHours(0, 0, 0, 0)

    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    sunday.setHours(23, 59, 59, 999)

    const weeklyExpenses = ChartData?.filter((expense) => {
        const date = new Date(expense.expenseDate)

        return date >= monday && date <= sunday
    }) ?? []


    // =========================
    // 월간 데이터
    // =========================
    const firstDay = new Date(now.getFullYear(),now.getMonth(),1)
    const lastDay = new Date(now.getFullYear(),now.getMonth() + 1,0)

    firstDay.setHours(0, 0, 0, 0)
    lastDay.setHours(23, 59, 59, 999)

    const monthlyExpenses = ChartData?.filter((expense) => {
        const date = new Date(expense.expenseDate)
        return date >= firstDay && date <= lastDay
    }) ?? []


    // =========================
    // 연간 데이터
    // =========================
    const firstDayOfYear = new Date(now.getFullYear(),0,1)

    const lastDayOfYear = new Date(now.getFullYear() + 1,0,0)

    firstDayOfYear.setHours(0, 0, 0, 0)
    lastDayOfYear.setHours(23, 59, 59, 999)

    const yearlyExpenses = ChartData?.filter((expense) => {
        const date = new Date(expense.expenseDate)
        return date >= firstDayOfYear && date <= lastDayOfYear
    }) ?? []


    // =========================
    // 카테고리별 금액 합산 함수
    // =========================
    const getCategoryData = (expenses: Expense[]) => {
        return expenses.reduce((acc, expense) => {const existing = acc.find(item => item.category === expense.category)

            if (existing) {
                existing.amount += expense.amount
            } 
            
            else {
                acc.push({category: expense.category, amount: expense.amount})
            }

            return acc
        }, [] as { category: string, amount: number }[])
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
    // 금액이 높은 순으로 정렬 → TOP 3
    // =========================
    const topExpenses = [...categoryData].sort((a, b) => b.amount - a.amount).slice(0, 3)


    // =========================
    // 가장 높은 금액
    // =========================
    const maxAmount = topExpenses[0]?.amount ?? 0


    // =========================
    // 금액 표시
    // =========================
    const formatAmount = (amount: number) => {
        if (amount >= 1000) return `円${Math.round(amount / 1000)}K`
        return `円 ${amount}`
    }


    return (
        <div className="bg-white bg-opacity-65 rounded-3xl p-5">

            {/* header */}
            <div className="mb-4">
                <span className="text-[#3D2C2C] font-bold text-sm">💴 支出が多い ! TOP 3</span>
            </div>


            {/* TOP 3 */}
            <div className="flex flex-col gap-2.5">
                {topExpenses.length === 0 ? (<p className="text-center text-[#B89090]">支出データがありません</p>) : 
                (topExpenses.map((item) => (

                        <div key={item.category} className="flex items-center gap-1.5">

                            {/* category */}
                            <span className="w-14 shrink-0 text-[#3D2C2C] font-bold text-sm">{item.category}</span>

                            {/* bar */}
                            <div className="flex-1 h-4 bg-white rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all" 
                                    style={{ width: `${(item.amount / maxAmount) * 100}%`,
                                    backgroundColor:item.amount === maxAmount? '#F47560': '#FFB8A6'}}/>
                                </div>

                            {/* amount */}
                            <span className="w-14 shrink-0 text-right text-[#F47560] font-bold">{formatAmount(item.amount)}</span>

                        </div>

                    ))

                )}

            </div>

        </div>
    )
}