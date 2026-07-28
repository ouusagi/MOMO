import { useNavigate } from "react-router-dom"
import bell from "../assets/bell.png"
import hero from "../assets/hero.png"
import hero2 from "../assets/minimomo.png"
import Button from "../components/common/Button"
import { useGetUser } from "../hooks/useUser"
import CategoryIcon from "../components/common/CategoryIcon"
import NavBottom from "../components/common/NavBottom"
import Card from "../components/common/Card"


const MainPage = () => {

    const { data, isLoading, error } = useGetUser()
    const navigate = useNavigate()
    const categories = [
        { emoji: '🍔', label: '食費' },
        { emoji: '☕', label: 'カフェ' },
        { emoji: '🚇', label: '交通' },
    ]

    if(isLoading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>エラーが発生しました</p>
    }

    return (
        <div className='w-full min-h-screen bg-gradient-to-b from-[#FFC3B6] to-[#F8A1A1CC] flex flex-col pb-24'>

            {/* header */}
            <div className='flex items-center justify-between px-6 pt-12 pb-4'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-[#FFB8A6] bg-opacity-50 rounded-full flex items-center justify-center'>
                        <img className="cursor-pointer" src={hero} alt="default_profile" />
                    </div>
                    <span className='text-[#5A2D2A] font-medium text-lg'>Hi ! {data?.username} !</span>
                </div>
                <img src={bell} alt="alert_bell" className="cursor-pointer"/>
            </div>

            {/*  expenses */}
            <div className='flex flex-col gap-4 px-6 mt-6'>
                <div className='bg-[#FFE6E0] rounded-3xl p-6 relative'>
                    <img src={hero} alt='momo' className='absolute -top-10 -left-4 w-30 h-30' />
                    <img src={hero2} alt='momo' className='absolute -top-7 -right-4 w-30 h-30' />
                    <div className='text-center mt-4'>
                        <p className='text-[#5A2D2A] font-bold'>今月の支出額</p>
                        <p className='text-[#5A2D2A] font-bold text-3xl mt-1'>300,000円</p>
                    </div>
                    <div className='border-t border-[#F0D0C8] my-4'></div>
                    <div className='flex gap-3'>
                        <Button className="" variant='primary' fullWidth onClick={() => navigate('/add')}>+ Add</Button>
                        <Button className="" variant="history" fullWidth onClick={() => navigate('/all')}>🕐 History</Button>
                    </div>
                </div>

                {/* categories */}
                <div className='flex gap-3 overflow-x-auto pb-2'>
                    {categories.map((cat) => (
                        <CategoryIcon
                            key={cat.label}
                            emoji={cat.emoji}
                            label={cat.label}
                            amount={0}
                            onClick={() => navigate('/all')}
                            className="w-24 h-20"
                        />
                    ))}
                    <CategoryIcon
                        emoji='+'
                        label='詳細'
                        onClick={() => navigate('/all')}
                        className="w-24 h-20"
                    />
                </div>

                {/* graph - add later */}
                <div className='bg-white bg-opacity-65 rounded-3xl p-4'>
                    <div className='flex items-center justify-between mb-4'>
                        <span className='text-[#3D2C2C] font-bold text-sm'>📈 今月の支出グラフ</span>
                        <span className='text-[#F47560] text-opacity-90 font-bold text-sm'>0円</span>
                    </div>
                    <div className='h-24 flex items-center justify-center'>
                        <p className='text-[#B89090] text-sm'>グラフは近日公開予定</p>
                    </div>
                </div>

                {/* today's expenses */}
                <div className="w-full">
                    <div className='flex items-center justify-between mb-3 px-2'>
                        <span className='text-[#7A5555] font-bold'>今日の支出</span>
                        <span className='text-[#F47560] text-sm cursor-pointer' onClick={() => navigate('/all')}>全て見る ›</span>
                    </div>

                    <div className='flex flex-col gap-3 text-center'>
                        <Card emoji="☕" title="スターバックス" amount={30000} onClick={()=> {}} time="午前 15:45"/>
                        <Card emoji="🍔" title="マクドナルド" amount={890} onClick={()=> {}} time="午前 08:31"/>
                    </div>
                </div>

            </div>    

            {/* bottomNav */}
            <div className='fixed bottom-0 left-0 right-0'>
                <NavBottom />
            </div>
        </div>
    )
}

export default MainPage