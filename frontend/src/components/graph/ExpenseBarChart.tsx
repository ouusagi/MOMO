import { ResponsiveContainer, BarChart, Bar, XAxis, Cell } from "recharts";
import { useGetExpenses } from "../../hooks/useExpense";

export const ExpenseBarChart = () => {

    const {data:ChartData, isLoading:isChartDataLoading, error:ChartDataError } = useGetExpenses()
    
    if(isChartDataLoading) return <p className="text-center">読み込み中...</p>
    if(ChartDataError) return <p>エラーが発生しました</p>

    // 일주일 지출 목록
    const now = new Date()
    const day = now.getDay()
    const diff = day === 0 ? -6 : 1 - day

    const monday = new Date(now)
    monday.setDate(now.getDate() + diff)
    monday.setHours(0,0,0,0)

    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    sunday.setHours(23,59,59,999)

    const weeklyExpenses = ChartData?.filter((expense) => {
        const date = new Date(expense.expenseDate)
        return date >= monday && date <= sunday
    })
    // 일주일 지출 목록


    // 요일별 금액 합산 + 가장 높은 금액 구하기
    const weeklyData = weeklyExpenses?.reduce((acc, expense) => {
        const date = new Date(expense.expenseDate)
        const day = date.getDay()
        const index = day === 0 ? 6 : day - 1

        acc[index].amount += expense.amount
        return acc
    },[{ day: '月', amount: 0 },{ day: '火', amount: 0 },
       { day: '水', amount: 0 },{ day: '木', amount: 0 },
       { day: '金', amount: 0 },{ day: '土', amount: 0 },
       { day: '日', amount: 0 },]) ?? 
       [{ day: '月', amount: 0 },{ day: '火', amount: 0 },
        { day: '水', amount: 0 },{ day: '木', amount: 0 },
        { day: '金', amount: 0 },{ day: '土', amount: 0 },
        { day: '日', amount: 0 },]

    const maxAmount = Math.max(...weeklyData.map(item => item.amount))
    // 요일별 금액 합산 + 가장 높은 금액 구하기


    // 커스텀 
    const CustomTick = ({ x, y, payload }: any) => {
    const item = weeklyData.find(item => item.day === payload.value)

    return (
        <text x={x} y={y + 15} textAnchor="middle" fill={item?.amount === maxAmount ? '#F47560' : '#B66A6A'} fontWeight="bold">
            {payload.value}
        </text>
    )}
    // 커스텀


    return(
        <div className="w-full h-24">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} barCategoryGap="15%" className="pointer-events-none">
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={<CustomTick/>}></XAxis>
                    <Bar dataKey="amount" radius={[5,5,0,0]}>{weeklyData.map((item)=>(<Cell key={item.day} 
                    fill={item.amount === maxAmount ? '#F47560' : '#FFB8A6'}></Cell>))}</Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}