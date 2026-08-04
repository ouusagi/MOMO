

interface CardProps {
    onClick?: ()=> void
    emoji: string
    title:string
    time?: string
    amount: number
    memo?: string
}


const Card = ({onClick, emoji, title, time, amount = 0, memo}:CardProps) => {


    const CardBox = 'bg-[#FFFFFF] bg-opacity-65 rounded-2xl p-4 cursor-pointer flex items-center gap-4 justify-between w-full'
    const EmojiBox = 'bg-[#FFD9CE] rounded-xl flex items-center py-2 px-3'

    return(
        <div className={`${CardBox}`} onClick={onClick}>

          <div className="flex items-center gap-3">
            <div className={`${EmojiBox} text-xl`}>
                {emoji}
            </div>

            <div className="flex flex-col text-left">
                <span className="font-bold text-[#3D2C2C]">{title}</span>
                <span className="font-light text-[#B89090] text-sm">{time || memo}</span>
            </div>
          </div>

            <div className="flex flex-col text-right">
                <span className="font-bold text-[#F47560]">-{amount.toLocaleString()} 円</span>
            </div>
        </div>
    )
}

export default Card