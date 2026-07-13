

interface CategoryIconProps {
    emoji: string
    label: string
    onClick?: ()=> void
    active?: boolean
    amount?: number
}

const CategoryIcon = ({emoji, label, onClick, active = false, amount}:CategoryIconProps) => {

    const CategoryIconBox = 'rounded-3xl flex flex-col items-center gap-1 cursor-pointer bg-opacity-65 p-2 transition-colors w-28 h-28'
    const activebgColor = active ? 'bg-[#F47560]' : 'bg-[#FFFFFF]'
    const activelabelColor = active ? 'text-white' : 'text-[#3D2C2C]'

    return(
        <div className={`${CategoryIconBox} ${activebgColor}`} onClick={onClick}>
            <span className="text-3xl">{emoji}</span>
            <span className={`${activelabelColor} font-bold`}>{label}</span>
            {amount !== undefined && (<span className="text-[#F47560] font-bold">{amount.toLocaleString()} 円</span>)}
        </div>
    )
}

export default CategoryIcon