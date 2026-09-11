import { useNavigate } from "react-router-dom"
import { useGetUser } from "../hooks/useUser"
import { useGetExpenses } from "../hooks/useExpense"
import Button from "../components/common/Button"
import transactionsBell from '../assets/transactionsBell.png'
import NavBottom from "../components/common/NavBottom"
import { useState } from "react"
import ConfirmModal from "../components/common/ConfirmModal"
import MoneyPigIcon from '../assets/mypageIcons/Piggy-Bank.svg'
import AccountIcon from '../assets/mypageIcons/AccountSettings.svg'
import SignOutIcon from '../assets/mypageIcons/SignOut.svg'


const MyPage = () => {

    const navigate = useNavigate()
    const { data: UserData, isLoading: UserLoading, error: UserError } = useGetUser()
    const { data: ExpensesData, isLoading: ExpensesLoading, error: ExpensesError } = useGetExpenses()
    const [isSignOutOpen, setIsSignOutOpen] = useState(false)
        
    if (UserLoading || ExpensesLoading) {
        return <p className="text-center">読み込み中...</p>
    }

    if (UserError || ExpensesError) {
        return <p className="text-center">エラーが発生しました。</p>
    }

    if (!UserData || !ExpensesData) {
        return <p className="text-center">ユーザー情報が見つかりません。</p>
    }

    const now = new Date()

    // 지금까지 기록한 지출 전체 건수
    const totalExpenseCount = ExpensesData.length

    // 이번 달 지출
    const monthlyExpenses = ExpensesData.filter((expense) =>{
        const [year, month] = expense.expenseDate.slice(0,10).split("-").map(Number)
        return (
            year === now.getFullYear() && month === now.getMonth() + 1 
        )
    })

    // 이번 달 지출 건수
    const monthlyCount = monthlyExpenses.length

    // 예산 k단위 변환
    const formatAmount = (amount:number) => {
        if(amount >= 10000){
            const value = amount/1000
            return `${Number(value.toFixed(1))}k`
        }
        return amount.toLocaleString()
    }

    // 메뉴
    const menuItems = [
        {
            label: "予算設定",
            icon: <img className="w-5" src={MoneyPigIcon} alt="moneybank_pig_icon" />,
            onClick: () => navigate("/budget")
        },
        {
            label: "アカウント設定",
            icon: <img className="w-5" src={AccountIcon} alt="AccountIcon" />,
            onClick: () => navigate("/account")
        }
    ]


    return(
        <div className="w-full min-h-screen bg-gradient-to-b from-[#FFC3B6] to-[#F8A1A1CC] flex flex-col pb-24">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-12 pb-4">
                <Button variant="back" onClick={() => navigate("/main")}>←</Button>
                <span className="text-[#3D2C2C] font-bold">マイページ</span>
                <Button variant="back" onClick={() => navigate("/settings")}><img src={transactionsBell} alt="bell-img"/></Button>
            </div>

            <div className="flex flex-col items-center px-6">

                {/* Profile */}
                <div className="flex flex-col items-center mt-4">
                    <div className="w-28 h-28 rounded-3xl bg-[#FFB8A6] flex items-center justify-center overflow-hidden">
                        <img src={`http://localhost:8080${UserData.profileImage}`} alt="profile" className={`${UserData.profileImage === '/uploads/profiles/default.png' ? 
                            'w-24 h-24' : 'w-28 h-28'} rounded-3xl object-cover object-center`}/>
                    </div>
                    <p className="text-[#3D2C2C] text-2xl font-bold mt-4">{UserData.username}</p>
                    <p className="text-[#B89090] text-sm mt-1">今日もコツコツ節約中 🍑</p>
                </div>


                {/* Summary */}
                <div className="grid grid-cols-3 gap-3 w-full mt-4">

                    <div className="bg-white bg-opacity-65 rounded-2xl p-4 text-center">
                        <p className="text-[#F47560] text-xl font-bold">{monthlyCount}</p>
                        <p className="text-[#B89090] text-xs mt-1">今月の件数</p>
                    </div>

                    <div className="bg-white bg-opacity-65 rounded-2xl p-4 text-center">
                        <p className="text-[#F47560] text-xl font-bold">¥{formatAmount(UserData.budget)}</p>
                        <p className="text-[#B89090] text-xs mt-1">今月の予算</p>
                    </div>

                    <div className="bg-white bg-opacity-65 rounded-2xl p-4 text-center">
                        <p className="text-[#F47560] text-xl font-bold">{totalExpenseCount}</p>
                        <p className="text-[#B89090] text-xs mt-1">累計記録数</p>
                    </div>

                </div>

                {/* Menu */}
                <div className="w-full flex flex-col gap-3 mt-6">

                    {menuItems.map((item) => (
                        <div key={item.label} onClick={item.onClick}
                            className="bg-white bg-opacity-65 rounded-2xl px-4 py-4 flex items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#FFD9CE] rounded-xl flex items-center justify-center">
                                    <span>{item.icon}</span>
                                </div>
                                <span className="text-[#3D2C2C] font-bold">{item.label}</span>
                            </div>

                            <span className="text-[#B89090]">›</span>
                        </div>
                    ))}

                    {/* Sign out */}
                    <div onClick={()=> setIsSignOutOpen(true)}
                        className="bg-[#F79C95] bg-opacity-60 rounded-2xl px-4 py-4 flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#F47560] bg-opacity-20 rounded-xl flex items-center justify-center">
                                <img src={SignOutIcon} alt="SignOutIcon" />
                            </div>
                            <span className="text-[#F47560] font-bold">サインアウト</span>
                        </div>

                        <span className="text-[#F47560]">›</span>
                    </div>

                </div>


                <ConfirmModal isOpen={isSignOutOpen} title="サインアウト" message="本当にサインアウトしますか？" icon={<img className="w-5" src={SignOutIcon} alt="SignOutIcon"/>} confirmText="サインアウト"
                 cancelText="キャンセル"
                 onCancel={() => setIsSignOutOpen(false)}
                 onConfirm={() => {localStorage.removeItem("token"); navigate("/")}}/>

            </div>

            {/* BottomNav */}
            <div className="fixed bottom-0 left-0 right-0">
                <NavBottom />
            </div>

        </div>
    )
}

export default MyPage