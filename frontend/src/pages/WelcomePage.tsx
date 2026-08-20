import { useNavigate } from "react-router-dom"
import hero from '../assets/hero.png'
import Button from "../components/common/Button"
import { useEffect } from "react"


const WelcomePage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){navigate('/main')}
        else{navigate('/')}
    },[navigate])

    return(
        <div className='w-full min-h-screen bg-gradient-to-b from-[#FFC3B6] to-[#F8A1A1CC] flex flex-col items-center justify-center px-8 gap-8'>
            <img src={hero} alt="momo_hero_img" className="w-32 h-32"/>

            <div className="text-center">
                <p className="text-2xl text-[#5A2D2A]">今日の支出</p>
                <p className="text-2xl text-[#5A2D2A]">MOMOにメモしよう！</p>
            </div>

            <div className="w-full flex flex-col gap-4">
                <Button className="loginBtn" variant="primary" fullWidth onClick={()=> navigate('/login')}>ログイン</Button>
                <Button className="signupBtn" variant="outline" fullWidth onClick={()=> navigate('/signup')}>新規登録</Button>
            </div>
        </div>
    )
}

export default WelcomePage