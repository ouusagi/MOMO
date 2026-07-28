

interface CategoryIconProps {
    emoji: string
    label: string
    onClick?: ()=> void
    active?: boolean
    amount?: number
}

const CategoryIcon = ({emoji, label, onClick, active = false, amount}:CategoryIconProps) => {

    const CategoryIconBox = 'rounded-2xl flex flex-col items-center cursor-pointer bg-opacity-65 p-1 transition-colors w-24 h-20'
    const activebgColor = active ? 'bg-[#F47560]' : 'bg-[#FFFFFF]'
    const activelabelColor = active ? 'text-white' : 'text-[#3D2C2C]'

    return(
        <div className={`${CategoryIconBox} ${activebgColor}`} onClick={onClick}>
            <span className="text-base">{emoji}</span>
            <span className={`${activelabelColor} font-bold text-base`}>{label}</span>
            {amount !== undefined && (<span className="text-[#F47560] font-bold">{amount.toLocaleString()} 円</span>)}
        </div>
    )
}

export default CategoryIcon