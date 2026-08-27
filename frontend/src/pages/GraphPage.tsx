import { useState } from "react"
import Button from "../components/common/Button"
import { useNavigate } from "react-router-dom"
import transactionsBell from '../assets/transactionsBell.png'
import { ExpenseBarChart } from "../components/graph/ExpenseBarChart"
import NavBottom from "../components/common/NavBottom"
import { CategoryDonutChart } from "../components/graph/CategoryDonutChart"
import { TopExpenseChart } from "../components/graph/TopExpenseChart"



const GraphPage = () => {

    const [activeTab, setActiveTab] = useState('週間')
    const tabs = ['週間', '月間', '年間']
    const navigate = useNavigate()


    return(
        <div className='w-full min-h-screen bg-gradient-to-b from-[#FFC3B6] to-[#F8A1A1CC] flex flex-col pb-24 overflow-hidden'>

            {/* header */}
            <div className='flex items-center justify-between px-6 pt-12 pb-4'>
                <Button className="" variant='back' onClick={() => navigate('/main')}>←</Button>
                <span className='text-[#3D2C2C] font-bold'>グラフ</span>
                <Button className="" variant="back" onClick={() => navigate('/main')}><img src={transactionsBell} alt="bell-img" /></Button>
            </div>

            <div className='flex flex-col gap-4 px-6'>

                {/* Tabs */}
                <div className='bg-white bg-opacity-60 rounded-2xl p-1 flex'>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-colors
                                ${activeTab === tab ? 'bg-[#F47560] text-white' : 'text-[#B89090]'}`}
                        >
                        {tab}
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