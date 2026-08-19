interface CategoryIconProps {
    Icon: string
    label: string
    onClick?: ()=> void
    active?: boolean
    amount?: number
    className?: string
}

const CategoryIcon = ({Icon, label, onClick, active = false, amount, className}:CategoryIconProps) => {

    const CategoryIconBox = 'rounded-2xl flex flex-col items-center cursor-pointer bg-opacity-65 p-1.5 transition-colors'
    const activebgColor = active ? 'bg-[#F47560]' : 'bg-[#FFFFFF]'
    const activelabelColor = active ? 'text-white' : 'text-[#3D2C2C]'

    return(
        <div className={`${CategoryIconBox} ${activebgColor} ${className} overflow-hidden`} onClick={onClick}>
            <img src={Icon} alt="icon-img" width={23}/>
            <span className={`${activelabelColor} font-bold text-base text-center`}>{label}</span>
            {amount !== undefined && (<span className="text-[#F47560] text-sm font-bold truncate w-full text-center">{amount.toLocaleString()} 円</span>)}
        </div>
    )
}

export default CategoryIcon