import { useNavigate } from "react-router-dom"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import { useState } from "react"
import { isValidEmail, isValidPassword } from "../../utils/Validation"
import api from "../../api/axios"
import { useTranslation } from "react-i18next"

interface SignUpStep1Props {
    loginID: string
    password: string
    setLoginID: (value: string) => void
    setPassword: (value: string) => void
    onNext: ()=> void
}

interface Term {
    title: string
    content: string
}

const SignUpStep1 = ({loginID, password, setLoginID, setPassword, onNext}:SignUpStep1Props) => {

    const { t } = useTranslation()
    const navigate = useNavigate()
    const [passwordConfirm, setpasswordConfirm] = useState('')
    const [error, seterror] = useState('')
    const [checked, setchecked] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const terms = t('signup.terms', { returnObjects: true }) as Term[]

    const handleNext = async ()=> {

        if(!loginID || !password || !passwordConfirm){
            seterror(t('signup.errorRequired'))
            return
        }

        if(password !== passwordConfirm){
            seterror(t('signup.errorPasswordMismatch'))
            return
        }

        if(!isValidEmail(loginID)){
            seterror(t('signup.errorInvalidEmail'))
            return
        }

        if(!isValidPassword(password)){
            seterror(t('signup.errorPasswordLength'))
            return
        }

        if(!checked){
            seterror(t('signup.errorTermsRequired'))
            return
        }

        const res = await api.post('/api/check-id',{loginID})

        if(res.data.duplicate){
            seterror(t('signup.errorDuplicateUserId'))
            return
        }

        seterror('')
        onNext()
    }

    return(
        <div className="w-full min-h-screen flex flex-col px-6 pt-5 pb-8 bg-[#FFC4B3]">
            <Button variant="back" onClick={()=> navigate('/')} className="">←</Button>

            <div className="w-full bg-white bg-opacity-50 h-2 rounded-xl mt-4">
                <div className="w-1/3 bg-[#F47560] h-2 rounded-xl"></div>
            </div>

            <div className="w-full flex items-center justify-between mt-3 mb-3">
                <span className="text-[#F47560] font-bold text-sm">1 / 3{t('signup.step')}</span>
                <span className="text-[#B89090] font-bold text-sm">{t('signup.stepTitle')}</span>
            </div>

            <div className="font-bold">
                <p className="text-2xl">{t('signup.welcomeGreeting')}</p>
                <div>
                    <p className="text-2xl flex gap-2"><span className="text-[#F47560]">MOMO</span> {t('signup.welcomeTitle')}</p>
                </div>
                <p className="text-2xl">{t('signup.welcomeSubtitle')} 🍑</p>
                <p className="text-[#B89090] mt-1">{t('signup.userIdDescription')}</p>
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <Input label={t('signup.userIdLabel')} type="email" value={loginID} onChange={(e)=> setLoginID(e.target.value)} placeholder='momo@gmail.com'></Input>
                <Input label={t('signup.passwordLabel')} type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='••••••••'></Input>
                <Input label={t('signup.passwordConfirmLabel')} type="password" value={passwordConfirm} onChange={(e)=> setpasswordConfirm(e.target.value)} placeholder='••••••••'></Input>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-col items-start gap-1.5 mt-4 px-1">
                <div className="flex gap-2 items-center">
                    <input onChange={(e)=> setchecked(e.target.checked)} className="w-5 h-7 rounded-3xl accent-[#F47560]" type="checkbox" />
                    <span className="text-[#7A5555]">{t('signup.termsAgreement')}</span>
                    <span className="text-s text-[#B89090] cursor-pointer" onClick={()=> setModalOpen(true)}>{t('signup.termsView')}</span>
                </div>

                <div className="flex gap-2 items-center">
                    <input className="w-5 h-7 rounded-3xl accent-[#F47560]" type="checkbox" />
                    <span className="text-[#7A5555]">{t('signup.marketingAgreement')}</span>
                </div>
            </div>

            <div className="w-full flex flex-col text-center gap-3">
                <Button variant="primary" onClick={handleNext} className="mt-5">{t('signup.nextButton')}</Button>
                <p className="text-[#B89090] text-s">{t('signup.loginPrompt')} <span className="text-[#F47560] cursor-pointer" onClick={()=> navigate('/login')}>{t('signup.loginButton')}</span></p>
            </div>




            {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6">
                <div className="bg-white rounded-2xl p-6 w-full max-h-[80vh] flex flex-col gap-4">

                    <div className="flex items-center justify-between">
                        <h2 className="text-[#3D2C2C] font-bold text-lg">{t('signup.termsTitle')}</h2>
                        <span className="text-[#B89090] cursor-pointer text-xl" onClick={() => setModalOpen(false)}>✕</span>
                    </div>

                    <div className="overflow-y-auto text-[#7A5555] text-sm leading-relaxed">
                        {terms.map((term, index)=>{
                            return(
                                <div key={index}>
                                    <p className="font-bold">{term.title}</p>
                                    <p>{term.content}</p>
                                </div>
                            )
                        })}
                    </div>

                    <Button className="modalBtn" variant="primary" fullWidth onClick={() => setModalOpen(false)}>{t('signup.termsClose')}</Button>
                </div>
            </div>
            )}
        </div>
    )
}

export default SignUpStep1