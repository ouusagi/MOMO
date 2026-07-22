import { useNavigate } from "react-router-dom"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import { useState } from "react"
import { isValidEmail, isValidPassword } from "../../utils/Validation"
import api from "../../api/axios"

interface SignUpStep1Props {
    loginID: string
    password: string
    setLoginID: (value: string) => void
    setPassword: (value: string) => void
    onNext: ()=> void
}

const SignUpStep1 = ({loginID, password, setLoginID, setPassword, onNext}:SignUpStep1Props) => {

    const navigate = useNavigate()
    const [passwordConfirm, setpasswordConfirm] = useState('')
    const [error, seterror] = useState('')
    const [checked, setchecked] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const terms = [
    { title: '第1条（目的）', content: '本規約は、MOMO（以下「本サービス」）の利用条件を定めるものです。' },
    { title: '第2条（利用登録）', content: '登録希望者が本規約に同意の上、所定の方法によって利用登録を申請し、当社がこれを承認することによって利用登録が完了します。' },
    { title: '第3条（個人情報の取り扱い）', content: '当社は、利用者の個人情報を適切に管理し、第三者への提供は行いません。' },
    { title: '第4条（禁止事項）', content: '利用者は以下の行為を行ってはなりません。・法令または公序良俗に違反する行為・他のユーザーへの迷惑行為' },
    { title: '第5条（免責事項）', content: '当社は、本サービスに関して生じた損害について、一切の責任を負いません。' },
    { title: '第6条（規約の変更）', content: '当社は、必要に応じて本規約を変更することができます。' },
    ]

    const handleNext = async ()=> {

        if(!loginID || !password || !passwordConfirm){
            seterror('全ての項目を入力してください')
            return
        }

        if(password !== passwordConfirm){
            seterror('パスワードが一致しません')
            return
        }

        if(!isValidEmail(loginID)){
            seterror('メールアドレスの形式が正しくありません')
            return
        }

        if(!isValidPassword(password)){
            seterror('パスワードは8文字以上入力してください')
            return
        }

        if(!checked){
            seterror('利用規約に同意してください')
            return
        }

        const res = await api.post('/api/check-id',{loginID})

        if(res.data.duplicate){
            seterror('すでに登録されているIDです')
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
                <span className="text-[#F47560] font-bold text-sm">1 / 3段階</span>
                <span className="text-[#B89090] font-bold text-sm">ユーザーID 入力</span>
            </div>

            <div className="font-bold">
                <p className="text-2xl">こんにちは！</p>
                <div>
                    <p className="text-2xl flex gap-2"><span className="text-[#F47560]">MOMO</span> へようこそ！</p>
                </div>
                <p className="text-2xl">一緒に始めましょう 🍑</p>
                <p className="text-[#B89090] mt-1">ユーザーIDを入力してください</p>
            </div>

            <div className="flex flex-col gap-4 mt-4">
                <Input label='ユーザーID' type="email" value={loginID} onChange={(e)=> setLoginID(e.target.value)} placeholder='momo@gmail.com'></Input>
                <Input label='パスワード' type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='••••••••'></Input>
                <Input label='パスワード再入力' type="password" value={passwordConfirm} onChange={(e)=> setpasswordConfirm(e.target.value)} placeholder='••••••••'></Input>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-col items-start gap-1.5 mt-4 px-1">
                <div className="flex gap-2 items-center">
                    <input onChange={(e)=> setchecked(e.target.checked)} className="w-5 h-7 rounded-3xl accent-[#F47560]" type="checkbox" />
                    <span className="text-[#7A5555]">(必須) サービス利用規約に同意します</span>
                    <span className="text-s text-[#B89090] cursor-pointer" onClick={()=> setModalOpen(true)}>見る ›</span>
                </div>

                <div className="flex gap-2 items-center">
                    <input className="w-5 h-7 rounded-3xl accent-[#F47560]" type="checkbox" />
                    <span className="text-[#7A5555]">(選択)マーケティング情報受信に同意します</span>
                </div>
            </div>

            <div className="w-full flex flex-col text-center gap-3">
                <Button variant="primary" onClick={handleNext} className="mt-5">次へ →</Button>
                <p className="text-[#B89090] text-s">すでにアカウントをお持ちですか？ <span className="text-[#F47560] cursor-pointer" onClick={()=> navigate('/login')}>ログイン</span></p>
            </div>




            {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6">
                <div className="bg-white rounded-2xl p-6 w-full max-h-[80vh] flex flex-col gap-4">

                    <div className="flex items-center justify-between">
                        <h2 className="text-[#3D2C2C] font-bold text-lg">サービス利用規約</h2>
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

                    <Button className="modalBtn" variant="primary" fullWidth onClick={() => setModalOpen(false)}>閉じる</Button>
                </div>
            </div>
            )}
        </div>
    )
}

export default SignUpStep1