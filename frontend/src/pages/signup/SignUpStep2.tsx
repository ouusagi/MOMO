import Button from "../../components/common/Button"
import hero from "../../assets/hero.png"
import Input from "../../components/common/Input"
import Select from "../../components/common/Select"
import { isValidUserName } from "../../utils/Validation"
import { useState } from "react"


interface SignUpStep2Props {
    userName: string
    budget: string
    setUserName: (value:string)=> void
    setBudget: (value:string)=> void
    onSubmit:()=> void
    onBack:()=> void
}


const SignUpStep2 = ({userName, budget, setUserName, setBudget, onSubmit, onBack}:SignUpStep2Props) => {

    const [error, seterror] = useState('')
    const [currency, setCurrency] = useState('JPY')
    const options = [
        { value: 'JPY', label: '🇯🇵 日本 円 (YEN)' },
        { value: 'KRW', label: '🇰🇷 韓国 ウォン (KRW)' },
        { value: 'USD', label: '🇺🇸 米ドル (USD)' },
        ]

    const handleSubmit = () => {

        if(!userName){
            seterror('ユーザーネームを入力してください')
            return
        }

        if(!isValidUserName(userName)){
            seterror('ユーザー名は10文字以下で入力してください')
            return
        }
        seterror('')
        onSubmit()
    }

    return(
        <div className='w-full min-h-screen flex flex-col px-6 pt-5 pb-8 bg-[#FFC4B3]'>
            <Button variant="back" className="" onClick={onBack}>←</Button>

            <div className="w-full bg-white bg-opacity-50 h-2 rounded-xl mt-4">
                <div className="w-2/3 bg-[#F47560] h-2 rounded-xl"></div>
            </div>

            <div className="w-full flex items-center justify-between mt-3 mb-3">
                <span className="text-[#F47560] font-bold text-sm">2 / 3段階</span>
                <span className="text-[#B89090] font-bold text-sm">プロフィールを設定</span>
            </div>

            <div className='text-center mb-6'>
                <h1 className='text-2xl font-bold text-[#3D2C2C]'>あと少しです！</h1>
                <p className='text-[#B89090] mt-1'>プロフィールを設定してください🍑</p>
            </div>

            <div className='flex justify-center mb-6'>
                <div className='relative bg-[#FFB8A6] rounded-3xl'>
                    <img src={hero} alt='momo-icon' className='w-24 h-24'/>
                    <div className='absolute -bottom-1 -right-3 bg-[#F47560] rounded-xl w-9 h-9 flex items-center justify-center cursor-pointer'>
                        <span className='text-white text-s'>📷</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <div className="relative">
                    <Input type="text" label="ユーザーネーム" placeholder='MOMO01' value={userName} onChange={(e)=> setUserName(e.target.value)} />
                    <span className='absolute right-3 bottom-4 text-[#B89090] text-xs'>
                        {userName.length}/10
                    </span>
                </div>

            <div className="relative">
                <span className="absolute right-0 text-s text-[#B89090]">後で設定可能です</span>
                <Input type="text" label="月間予算の設定" placeholder='300,000' value={budget === '' ? '' : Number(budget).toLocaleString()} onChange={(e)=>{
                    const raw = e.target.value.replaceAll(',','')
                    if(/^\d*$/.test(raw)) 
                        return setBudget(raw)
                }}/>
                <span className="absolute bottom-4 right-3 text-[#B89090]">円</span>
            </div>

            <Select label="通貨" value={currency} onChange={(e) => setCurrency(e.target.value)} options={options}/>

            {error && <p className="text-red-500">{error}</p>}
                
            <Button className="mt-5" type="submit" variant="primary" fullWidth onClick={handleSubmit}>🍑 はじめる！</Button>
            
            </div>

        </div>
    )
}

export default SignUpStep2