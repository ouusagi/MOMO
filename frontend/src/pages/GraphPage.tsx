import { useState } from "react"
import Button from "../components/common/Button"
import { useNavigate } from "react-router-dom"
import { ExpenseBarChart } from "../components/graph/ExpenseBarChart"
import NavBottom from "../components/common/NavBottom"
import { CategoryDonutChart } from "../components/graph/CategoryDonutChart"
import { TopExpenseChart } from "../components/graph/TopExpenseChart"
import NotificationButton from "../components/common/NotificationButton"
import { useTranslation } from "react-i18next"



const GraphPage = () => {

    const { t } = useTranslation()
    type Period = 'weekly' | 'monthly' | 'yearly'
    const [activeTab, setActiveTab] = useState<Period>('weekly')
    const tabs:{ value: Period; label: string }[] = [
    { value: 'weekly', label: t('graphPage.weekly') },
    { value: 'monthly', label: t('graphPage.monthly') },
    { value: 'yearly', label: t('graphPage.yearly') },
]
    const navigate = useNavigate()


    return(
        <div className='w-full min-h-screen bg-gradient-to-b from-[#FFC3B6] to-[#F8A1A1CC] flex flex-col pb-40 overflow-hidden'>

            {/* header */}
            <div className='flex items-center justify-between px-6 pt-20 pb-4'>
                <Button className="" variant='back' onClick={() => navigate('/main')}>←</Button>
                <span className='text-[#3D2C2C] font-bold'>{t('graphPage.title')}</span>
                <NotificationButton/>
            </div>

            <div className='flex flex-col gap-4 px-6'>

                {/* Tabs */}
                <div className='bg-white bg-opacity-60 rounded-2xl p-1 flex'>
                    {tabs.map(tab => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-colors
                                ${activeTab === tab.value ? 'bg-[#F47560] text-white' : 'text-[#B89090]'}`}
                        >
                        {tab.label}
                        </button>
                    ))}
                </div>
                
                {/* Graph */}
                <div className="flex flex-col gap-5">
                <ExpenseBarChart period={activeTab}/>
                <CategoryDonutChart period={activeTab}/>
                <TopExpenseChart period={activeTab}/>
                </div>
                
            </div> 

            <div className="fixed bottom-0 left-0 right-0">
                <NavBottom/>
            </div>
        </div>
    )
}

export default GraphPage