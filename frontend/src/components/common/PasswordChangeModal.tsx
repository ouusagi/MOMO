import { useEffect, useState } from "react"
import { useUpdatePassword } from "../../hooks/useUser"
import toast from "react-hot-toast"
import axios from "axios"

interface PasswordChangeModalProps {
    isOpen: boolean
    onClose: () => void
}

const PasswordChangeModal = ({ isOpen, onClose }: PasswordChangeModalProps) => {

    const { mutate: updatePassword, isPending } = useUpdatePassword()

    const [show, setShow] = useState(false)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

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

    const handleUpdatePassword = () => {

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("すべての項目を入力してください")
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error("新しいパスワードが一致しません")
            return
        }

        if (newPassword.length < 8) {
            toast.error("パスワードは8文字以上で入力してください")
            return
        }

        updatePassword({currentPassword, newPassword}, {
            onSuccess: () => {
                toast.success("パスワードを変更しました")
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
                onClose()
            },

            onError: (error) => {
                if(axios.isAxiosError(error)){
                    toast.error(error.response?.data?.error || "パスワードの変更に失敗しました")
                }
            }
        })
    }

    return(
        <div className={`fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/30 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}>

            <div className={`w-full max-w-sm bg-[#FFF9F7] rounded-3xl p-6 shadow-xl transition-all duration-500 ease-out
                ${show ? "translate-y-0 opacity-100" : "translate-y-40 opacity-0"}`}
            >

                {/* Title */}
                <div className="text-center">
                    <h2 className="text-lg font-bold text-[#3D2C2C]">パスワード変更</h2>
                    <p className="text-xs text-[#B89090] mt-1">現在のパスワードと新しいパスワードを入力してください</p>
                </div>


                {/* Inputs */}
                <div className="flex flex-col gap-3 mt-6">

                    <input type="password" autoComplete="current-password" value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)} placeholder="現在のパスワード" autoFocus
                        className="w-full px-4 py-3 rounded-2xl bg-[#FFEDE8] text-[#3D2C2C] font-medium outline-none
                            border-2 border-transparent focus:border-[#8FAF9A] transition-colors"
                    />

                    <input type="password" autoComplete="new-password" value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} placeholder="新しいパスワード"
                        className="w-full px-4 py-3 rounded-2xl bg-[#FFEDE8] text-[#3D2C2C] font-medium outline-none
                            border-2 border-transparent focus:border-[#8FAF9A] transition-colors"
                    />

                    <input type="password" autoComplete="new-password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} placeholder="新しいパスワード（確認）"
                        className="w-full px-4 py-3 rounded-2xl bg-[#FFEDE8] text-[#3D2C2C] font-medium outline-none
                            border-2 border-transparent focus:border-[#8FAF9A] transition-colors"
                    />

                </div>


                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                    <button type="button" onClick={onClose}
                        className="flex-1 py-3 rounded-2xl bg-[#F3E7E4] text-[#7A5555] font-bold"
                    >
                        キャンセル
                    </button>

                    <button type="button" onClick={handleUpdatePassword} disabled={isPending}
                        className="flex-1 py-3 rounded-2xl bg-[#F47560] text-white font-bold shadow-sm disabled:opacity-50"
                    >
                        {isPending ? "変更中..." : "保存する"}
                    </button>
                </div>

            </div>

        </div>
    )
}

export default PasswordChangeModal