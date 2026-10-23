import Button from "../../components/common/Button"
import hero from "../../assets/hero.png"
import Input from "../../components/common/Input"
import Select from "../../components/common/Select"
import { isValidUserName } from "../../utils/Validation"
import { useState } from "react"
import api from "../../api/axios"
import { useTranslation } from "react-i18next"
import i18n from "../../i18n"

interface SignUpStep2Props {
    userName: string
    budget: string
    profileImage: File | null
    setUserName: (value:string)=> void
    setBudget: (value:string)=> void
    setProfileImage: (value:File | null)=> void
    onSubmit:()=> void
    onBack:()=> void
}


const SignUpStep2 = ({userName, budget, profileImage, setUserName, setBudget, setProfileImage, onSubmit, onBack}:SignUpStep2Props) => {

    const { t } = useTranslation()
    const [error, seterror] = useState('')
    // const [currency, setCurrency] = useState('JPY')
    const options = [
        { value: 'JPY', label: `${t('signup.currencyJPY')}` },
        { value: 'KRW', label: `${t('signup.currencyKRW')}` },
        ]

    const handleSubmit = async () => {

        if(!userName){
            seterror(t('signup.userNameRequired'))
            return
        }

        if(!isValidUserName(userName)){
            seterror(t('signup.userNameMaxLength'))
            return
        }

        const res = await api.post('/api/check-username',{userName})
        if(res.data.duplicate){
            seterror(t('signup.userNameDuplicate'))
            return
        }

        seterror('')
        onSubmit()
    }

    return(
        <div className='w-full min-h-screen flex flex-col px-6 pt-20 pb-10 bg-[#FFC4B3]'>
            <Button variant="back" className="" onClick={onBack}>←</Button>

            <div className="w-full bg-white bg-opacity-50 h-2 rounded-xl mt-4">
                <div className="w-2/3 bg-[#F47560] h-2 rounded-xl"></div>
            </div>

            <div className="w-full flex items-center justify-between mt-3 mb-3">
                <span className="text-[#F47560] font-bold text-sm">2 / 3{t('signup.step')}</span>
                <span className="text-[#B89090] font-bold text-sm">{t('signup.step2Title')}</span>
            </div>

            <div className='text-center mb-6'>
                <h1 className='text-2xl font-bold text-[#3D2C2C]'>{t('signup.step2Welcome')}</h1>
                <p className='text-[#B89090] mt-1'>{t('signup.step2Subtitle')}</p>
            </div>

            <div className='flex justify-center mb-6'>
                <div className='relative bg-[#FFB8A6] rounded-3xl'>
                    <img src={profileImage ? URL.createObjectURL(profileImage) : hero} alt='momo-icon' className='w-24 h-24 rounded-3xl'/>
                    <input type="file" accept="image/*" className="hidden" id="profileImage" onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setProfileImage(file)
                    }}/>

                <label htmlFor="profileImage" className='absolute -bottom-1 -right-3 bg-[#F47560] rounded-xl w-9 h-9 flex items-center justify-center cursor-pointer'>
                    <span className='text-white text-s'>📷</span>
                </label>
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <div className="relative">
                    <Input type="text" label={t('signup.userNameLabel')} placeholder='MOMO01' value={userName} onChange={(e)=> setUserName(e.target.value)} />
                    <span className='absolute right-3 bottom-4 text-[#B89090] text-xs'>
                        {userName.length}/10
                    </span>
                </div>

            <div className="relative">
                <span className="absolute right-0 text-s text-[#B89090]">{t('signup.monthlyBudgetOptional')}</span>
                <Input type="text" label={t('signup.monthlyBudgetLabel')} placeholder='300,000' value={budget === '' ? '' : Number(budget).toLocaleString()} onChange={(e)=>{
                    const raw = e.target.value.replaceAll(',','')
                    if(/^\d*$/.test(raw)) 
                        return setBudget(raw)
                }}/>
                <span className="absolute bottom-4 right-3 text-[#B89090]">{t('signup.currency')}</span>
            </div>

            <Select label={t('signup.currencyLabel')} value={i18n.language.startsWith('ko') ? 'KRW' : 'JPY'} onChange={()=>{}} options={options}/>

            {error && <p className="text-red-500">{error}</p>}
                
            <Button className="mt-5" type="submit" variant="primary" fullWidth onClick={handleSubmit}>{t('signup.step2SubmitButton')}</Button>
            
            </div>

        </div>
    )
}

export default SignUpStep2