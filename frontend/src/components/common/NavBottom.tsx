import { useLocation, useNavigate } from 'react-router-dom'
import mainIcon from '../../assets/navbottomIcons/Main.svg'
import profileIcon from '../../assets/navbottomIcons/Profile.svg'
import plusIcon from '../../assets/navbottomIcons/Plus.svg'
import calendarIcon from '../../assets/navbottomIcons/Calendar.svg'
import graphIcon from '../../assets/navbottomIcons/Graph.svg'
import { useTranslation } from "react-i18next"


interface NavButtonProps {
    Icon: string
    label: string
    active?: boolean
    onClick: ()=> void
    className: string
}

const NavBottomIcon = {
    "home": mainIcon,
    "profile": profileIcon,
    "add": plusIcon,
    "calendar": calendarIcon,
    "graph": graphIcon
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
    const { t } = useTranslation()

    return(
      <nav className="w-full bg-white bg-opacity-80 pb-6 pt-4">
            <div className="mx-auto flex max-w-md items-center justify-between px-6 gap-8">
                <NavButton label={t('nav.home')} onClick={()=> navigate("/main")} active={location.pathname === "/main"} Icon={NavBottomIcon["home"]} className='text-white'></NavButton>
                <NavButton label={t('nav.profile')} onClick={()=> navigate("/mypage")} active={location.pathname === "/mypage"} Icon={NavBottomIcon["profile"]} className='text-white'></NavButton>
                <NavButton label={t('nav.add')} onClick={()=> navigate("/add")} active={true} Icon={NavBottomIcon["add"]} className='text-white'></NavButton>
                <NavButton label={t('nav.calendar')} onClick={()=> navigate("/calendar")} active={location.pathname === "/calendar"} Icon={NavBottomIcon["calendar"]} className='text-white'></NavButton>
                <NavButton label={t('nav.graph')} onClick={()=> navigate("/graph")} active={location.pathname === "/graph"} Icon={NavBottomIcon["graph"]} className='text-white'></NavButton>
            </div>
      </nav>
    )
}
