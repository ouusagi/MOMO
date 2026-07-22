import { useEffect, useState } from 'react'
import hero2 from '../../assets/hero2.png'
import Button from '../../components/common/Button'

interface SignUpStep3Props {
    userName:string
    onNext:()=> void
}


const SignUpStep3 = ({userName, onNext}:SignUpStep3Props) => {

    const [show, setshow] = useState(false)

    useEffect(()=>{
        setTimeout(() => {
            setshow(true)
        }, 100);
    },[])

    return(
        <div className="w-full min-h-screen bg-gradient-to-b relative from-[#FFC3B6] to-[#FF9F8F] flex flex-col items-center justify-center px-8 gap-8 overflow-hidden">

            <div className='absolute w-3 h-3 bg-yellow-300 rounded-2xl top-10 left-20 bg-opacity-50 transition-all animate-bounce'></div>
            <div className='absolute w-4 h-4 bg-yellow-200 rounded-2xl top-16 right-10 bg-opacity-50 transition-all animate-ping'></div>
            <div className='absolute w-4 h-4 bg-[#FFD9CE] rounded-2xl top-24 left-10 bg-opacity-50 transition-all animate-pulse'></div>
            <div className='absolute w-2 h-2 bg-yellow-200 rounded-2xl top-28 right-10 bg-opacity-50 transition-all animate-bounce'></div>
            <div className='absolute text-xl top-40 left-16 transition-all opacity-40 animate-pulse'>✨</div>
            <div className='absolute text-xs top-36 right-16 transition-all opacity-40 animate-pulse'>⭐</div>
            <div className='absolute w-2 h-2 bg-white rounded-2xl top-60 right-14 bg-opacity-50 transition-all animate-ping'></div>
            <div className='absolute w-1 h-1 bg-white rounded-2xl top-64 left-14 bg-opacity-50 transition-all animate-ping'></div>
            <div className='absolute text-xs top-96 left-10 transition-all opacity-40 animate-pulse'>✨</div>
            <div className='absolute text-xl top-80 right-10 transition-all opacity-40 animate-pulse'>✨</div>
            <div className='absolute w-2 h-2 bg-white rounded-2xl bottom-64 left-28 bg-opacity-50 transition-all animate-ping'></div>
            <div className='absolute w-2 h-2 bg-white rounded-2xl bottom-60 right-20 bg-opacity-50 transition-all animate-ping'></div>


            <div className={`transition-all duration-1000 ${show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <img src={hero2} alt="hero2" className='w-40 h-45'/>
            </div>
            

            <div className={`text-center flex flex-col gap-3 transition-all duration-1000 delay-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className="text-3xl font-bold text-[#FFFFFF]">登録完了 !</h1>
                <p className="text-xl text-[#FFFFFF]">{userName}さん、歓迎します 🎉</p>
                <p className='text-sm text-center text-[#FFFFFF] text-opacity-75'>さあ、MOMOと一緒に<br/>節約の消費習慣を作ってみましょう！</p>

                <div className='flex flex-col gap-2 mt-4 text-left bg-[#FFFFFF] bg-opacity-20 px-10 py-6 rounded-3xl'>
                    <div className='flex items-center gap-3'>
                        <span>📷</span>
                        <span className='text-[#FFFFFF] text-sm font-bold'>レシートを撮影すると自動で記録</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <span>📅</span>
                        <span className='text-[#FFFFFF] text-sm font-bold'>カレンダーで一目で支出を確認</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <span>📊</span>
                        <span className='text-[#FFFFFF] text-sm font-bold'>統計で消費パターンを分析</span>
                    </div>
                </div>
            </div>

            <div className={`w-full transition-all duration-1000 delay-700 ${show ? 'opacity-100' : 'opacity-0'}`}>
                <Button variant='outline' fullWidth onClick={onNext} className=''>メイン画面へ移動 🍑</Button>
            </div>

        </div>
    )
}

export default SignUpStep3