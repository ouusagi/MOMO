import { useState } from "react"
import hero from "../assets/hero.png"
import Button from "../components/common/Button"
import Input from "../components/common/Input"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/authStore"
import { useTranslation } from "react-i18next"


const LoginPage = () => {

    const [loginID, setLoginID] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuthStore()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleLogin = async () => {
        if(!loginID || !password){
            setError(t('signup.errorRequired'))
            return
        }

        try {
            await login(loginID, password)
            setError('')
            navigate('/main')
        } catch (error) {
            console.log("로그인 실패", error)
            setError(t('signin.signinError'))
            return
        }

    }


    return(
        <div className='relative w-full min-h-screen bg-gradient-to-b from-[#FFC3B6] to-[#F8A1A1CC] flex flex-col items-center justify-center px-8 gap-8'>
            <Button variant="back" className="absolute top-5 left-5" onClick={()=> navigate('/')}>←</Button>

            <img src={hero} alt="momo_hero_img" className="w-32 h-32 cursor-pointer" onClick={()=> navigate('/')}/>

            <div className="text-center">
                <p className="text-2xl text-[#5A2D2A] font-rounded">{t('welcome.title')}</p>
                <p className="text-2xl text-[#5A2D2A] font-rounded">{t('welcome.subtitle')}</p>
            </div>

            <div className="w-full flex flex-col gap-4 mt-4">
                <Input label={t('signup.userIdLabel')} type="email" value={loginID} onChange={(e)=> setLoginID(e.target.value)} placeholder='momo@gmail.com'></Input>
                <Input label={t('signup.passwordLabel')} type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='••••••••'></Input>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="w-full flex flex-col gap-4">
                <Button type="button" className="loginBtn" variant="primary" fullWidth onClick={handleLogin}>{t('signup.loginButton')}</Button>
            </div>
        </div>
    )
}

export default LoginPage 