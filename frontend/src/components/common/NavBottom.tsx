import { useLocation, useNavigate } from 'react-router-dom'
import mainIcon from '../../assets/navbottomIcons/Main.svg'
import profileIcon from '../../assets/navbottomIcons/Profile.svg'
import plusIcon from '../../assets/navbottomIcons/Plus.svg'
import calendarIcon from '../../assets/navbottomIcons/Calendar.svg'
import graphIcon from '../../assets/navbottomIcons/Graph.svg'


interface NavButtonProps {
    Icon: string
    label: string
    active?: boolean
    onClick: ()=> void
    className: string
}

const NavBottomIcon = {
    "ホーム": mainIcon,
    "プロフィール": profileIcon,
    "追加": plusIcon,
    "カレンダー": calendarIcon,
    "グラフ": graphIcon
}

// 네비게이션바 전용 버튼 UI 컴포넌트
const NavButton = ({ Icon, label, active = false, onClick, className }:NavButtonProps) => {
    
    const bgColor = active ? 'bg-[#F47560]' : 'bg-[#F08070] bg-opacity-10'
    const labelColor = active ? 'text-[#F47560] font-bold' : 'text-[#B89090] font-bold'

    return(
        <div className='flex flex-col items-center text-center w-16 gap-1 min-w-0'>
            <button type='button' onClick={onClick} className={`w-12 h-12 p-3 flex flex-col transition-colors items-center outline-none rounded-xl ${bgColor} ${className}`}>
                <img src={Icon} alt="navbottom-icon-img" className="w-8 h-8"/>
            </button>
            <span className={`${labelColor} font-bold text-xs whitespace-nowrap transition-colors`}>{label}</span>
        </div>
    )
}

// 네비게이션바 전용 UI 컴포넌트 
export default function NavBottom(){

    const location = useLocation()
    const navigate = useNavigate()

    return(
      <nav className="w-full bg-white bg-opacity-80 pb-6 pt-4">
            <div className="mx-auto flex max-w-md items-center justify-between px-6 gap-8">
                <NavButton label='ホーム' onClick={()=> navigate("/main")} active={location.pathname === "/main"} Icon={NavBottomIcon["ホーム"]} className='text-white'></NavButton>
                <NavButton label='プロフィール' onClick={()=> navigate("/profile")} active={location.pathname === "/profile"} Icon={NavBottomIcon["プロフィール"]} className='text-white'></NavButton>
                <NavButton label='追加' onClick={()=> navigate("/add")} active={true} Icon={NavBottomIcon["追加"]} className='text-white'></NavButton>
                <NavButton label='カレンダー' onClick={()=> navigate("/calendar")} active={location.pathname === "/calendar"} Icon={NavBottomIcon["カレンダー"]} className='text-white'></NavButton>
                <NavButton label='グラフ' onClick={()=> navigate("/graph")} active={location.pathname === "/graph"} Icon={NavBottomIcon["グラフ"]} className='text-white'></NavButton>
            </div>
      </nav>
    )
}
