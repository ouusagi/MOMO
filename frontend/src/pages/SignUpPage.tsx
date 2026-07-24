import useAuthStore from "../store/authStore"
import { useState } from "react"
import SignUpStep1 from "./signup/SignUpStep1"
import SignUpStep2 from "./signup/SignUpStep2"
import SignUpStep3 from "./signup/SignUpStep3"
import { useNavigate } from "react-router-dom"


const SignUpPage = () => {

    const navigate = useNavigate()
    const { signup, login } = useAuthStore()
    const [step, setstep] = useState(1)
    const [loginID, setLoginID] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [budget, setBudget] = useState('')

    const handleSignup = async () => {
        try {
            await signup(loginID, userName, password, Number(budget.replaceAll(',','')))
            console.log('회원가입 성공')
            setstep(3)
        } catch (error) {
            console.log('회원가입 실패:', error)
        }
    }

    const autoLogin = async () => {
        try {
            await login(loginID, password)
            console.log("로그인 성공")
            navigate('/main')
        } catch (error) {
            console.log("로그인 실패:", error)
        }
    }

    return(
        <div className='w-full min-h-screen'>
            {step === 1 && <SignUpStep1 loginID={loginID} password={password} setLoginID={setLoginID} setPassword={setPassword} onNext={()=> setstep(2)}/>}
            {step === 2 && <SignUpStep2 userName={userName} budget={budget} setUserName={setUserName} setBudget={setBudget} onSubmit={handleSignup} onBack={()=> setstep(1)}/>}
            {step === 3 && <SignUpStep3 userName={userName} onNext={autoLogin}/>}
        </div>
    )
}

export default SignUpPage