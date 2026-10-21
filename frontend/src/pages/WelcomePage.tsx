import { useNavigate } from "react-router-dom"
import hero from '../assets/hero.png'
import Button from "../components/common/Button"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"


const WelcomePage = () => {

    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){navigate('/main')}
        else{navigate('/')}
    },[navigate])

    return(
        <div className='w-full min-h-screen bg-gradient-to-b from-[#FFC3B6] to-[#F8A1A1CC] flex flex-col items-center justify-center px-8 gap-8'>
            <img src={hero} alt="momo_hero_img" className="w-32 h-32"/>

            <div className="text-center">
                <p className="text-2xl text-[#5A2D2A]">{t('welcome.title')}</p>
                <p className="text-2xl text-[#5A2D2A]">{t('welcome.subtitle')}</p>
            </div>

            <div className="w-full flex flex-col gap-4">
                <Button className="loginBtn" variant="primary" fullWidth onClick={()=> navigate('/login')}>{t('welcome.signin')}</Button>
                <Button className="signupBtn" variant="outline" fullWidth onClick={()=> navigate('/signup')}>{t('welcome.signup')}</Button>
            </div>
        </div>
    )
}

export default WelcomePage