import { useEffect, useState } from "react"

interface InputModalProps {
    isOpen: boolean
    title: string
    value: string
    placeholder?: string
    onChange: (value: string) => void
    onConfirm: () => void
    onCancel: () => void
}

const InputModal = ({isOpen,title,value,placeholder,onChange,onCancel,onConfirm}: InputModalProps) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setShow(true)
            }, 10)

            return () => clearTimeout(timer)
        }

        setShow(false)
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/30 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}>
            <div className={`w-full max-w-sm bg-[#FFF9F7] rounded-3xl p-6 shadow-xl transition-all duration-500 ease-out
                    ${show ? "translate-y-0 opacity-100" : "translate-y-40 opacity-0"}`}
            >

                {/* Title */}
                <div className="text-center">
                    <h2 className="text-lg font-bold text-[#3D2C2C]">{title}</h2>
                    <p className="text-xs text-[#B89090] mt-1">新しいユーザー名を入力してください</p>
                </div>

                {/* Input */}
                <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoFocus
                    className="w-full mt-6 px-4 py-3 rounded-2xl bg-[#FFEDE8] text-[#3D2C2C] font-medium outline-none
                        border-2 border-transparent focus:border-[#F47560] transition-colors"
                />

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                    <button type="button" onClick={onCancel} className="flex-1 py-3 rounded-2xl bg-[#F3E7E4] text-[#7A5555] font-bold">キャンセル</button>
                    <button type="button" onClick={onConfirm} className="flex-1 py-3 rounded-2xl bg-[#F47560] text-white font-bold shadow-sm">保存する</button>
                </div>

            </div>
        </div>
    )
}

export default InputModal