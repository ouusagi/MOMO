import { ResponsiveContainer, BarChart, Bar, XAxis, Cell } from "recharts";
import { useGetExpenses } from "../../hooks/useExpense";

interface ExpenseBarChartProps {
    period: string
}

export const ExpenseBarChart = ({period}:ExpenseBarChartProps) => {

    const {data:ChartData, isLoading:isChartDataLoading, error:ChartDataError } = useGetExpenses()
    const periodLabel = {
        '週間': '今週',
        '月間': '今月',
        '年間': '今年'
    }[period]
    const now = new Date()
    
    if(isChartDataLoading) return <p className="text-center">読み込み中...</p>
    if(ChartDataError) return <p>エラーが発生しました</p>

    // =========================
    // 주간 데이터
    // =========================

    // 일주일 지출 목록
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


    // 요일별 금액 합산
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
    // 요일별 금액 합산


    // =========================
    // 월간 데이터
    // =========================
    const firstDay = new Date(now.getFullYear(),now.getMonth(),1)
    const lastDay = new Date(now.getFullYear(),now.getMonth() + 1, 0)

    firstDay.setHours(0,0,0,0)
    lastDay.setHours(23,59,59,999)

    const monthlyExpenses = ChartData?.filter((expense)=>{
        const date = new Date(expense.expenseDate)
        return date >= firstDay && date <= lastDay
    }) ?? []

    // 1주차 ~ 5주차 합산
    const monthlyData = monthlyExpenses.reduce((acc, expense)=>{
        const date = new Date(expense.expenseDate)
        const week = Math.ceil(date.getDate() / 7)
        const index = week - 1

        acc[index].amount += expense.amount
        return acc
    },[
        { day: '1週', amount: 0 }, // index 0
        { day: '2週', amount: 0 }, // index 1
        { day: '3週', amount: 0 }, // index 2
        { day: '4週', amount: 0 }, // index 3
        { day: '5週', amount: 0 }, // index 4
    ])


    // =========================
    // 연간 데이터
    // =========================
    const firstDayOfYear = new Date(now.getFullYear(),0,1)
    const lastDayOfYear = new Date(now.getFullYear() + 1,0,0)

    firstDayOfYear.setHours(0,0,0,0)
    lastDayOfYear.setHours(23,59,59,999)

    const yearlyExpense = ChartData?.filter((expense)=>{
        const date = new Date(expense.expenseDate)
        return date >= firstDayOfYear && date <= lastDayOfYear
    }) ?? []

    // 월별 합산
    const yearlyData = yearlyExpense.reduce((acc, expense)=>{
        const date = new Date(expense.expenseDate)
        const month = date.getMonth()

        acc[month].amount += expense.amount
        return acc
    },[
    { day: '1月', amount: 0 }, //index 0
    { day: '2月', amount: 0 }, // index 1
    { day: '3月', amount: 0 }, // index 2
    { day: '4月', amount: 0 }, // index 3
    { day: '5月', amount: 0 }, // index 4
    { day: '6月', amount: 0 }, // index 5
    { day: '7月', amount: 0 }, // index 6
    { day: '8月', amount: 0 }, // index 7
    { day: '9月', amount: 0 }, // index 8
    { day: '10月', amount: 0 }, // index 9
    { day: '11月', amount: 0 }, // index 10
    { day: '12月', amount: 0 }, // index 11
    ])


    // =========================
    // period에 따라 사용할 데이터 결정 + 가장 높은 금액 구하기
    // =========================
    const chartData = period === '月間' ? monthlyData : period === '年間' ? yearlyData : weeklyData
    const maxAmount = Math.max(...chartData.map(item => item.amount))


    // =========================
    // XAxis 커스텀
    // =========================
    const CustomTick = ({ x, y, payload }: any) => {
    const item = chartData.find(item => item.day === payload.value)

    return (
        <text x={x} y={y + 15} textAnchor="middle" fill={item?.amount === maxAmount ? '#F47560' : '#B66A6A'} fontWeight="bold">
            {payload.value}
        </text>
    )}


    // =========================
    // 총 지출
    // =========================
    const totalAmount = (period === '月間' ? monthlyExpenses : period === '年間' ? yearlyData : weeklyExpenses)
    .reduce((total,expense)=> total + expense.amount,0)


    // =========================
    // 데이터 존재 여부 확인
    // =========================
    const hasChartData = chartData.some(item => item.amount > 0)

    return(
        <div className="bg-white bg-opacity-65 rounded-3xl p-4">

            <div className='flex items-center justify-between mb-4'>
                <span className='text-[#3D2C2C] font-bold text-sm'>📈 {periodLabel}の支出グラフ</span>
                <span className='text-[#F47560] text-opacity-90 font-bold text-sm'>{totalAmount.toLocaleString()}円</span>
            </div>

            <div className="chart-scroll w-full overflow-x-auto">
            <div className={period === '年間' ? 'min-w-[700px] h-24' : 'w-full h-24'}>
                {!hasChartData ? (<p className="text-center pt-5 text-[#B89090]">支出データがありません</p>) : (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap="15%" className="pointer-events-none">
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={<CustomTick/>}></XAxis>
                    <Bar dataKey="amount" radius={[5,5,0,0]}>{chartData.map((item)=>(<Cell key={item.day} 
                    fill={item.amount === maxAmount ? '#F47560' : '#FFB8A6'}></Cell>))}</Bar>
                </BarChart>
            </ResponsiveContainer>
                )}
            </div>
            </div>

        </div>
    )
}