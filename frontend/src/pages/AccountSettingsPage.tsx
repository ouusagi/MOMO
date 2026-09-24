import { useNavigate } from "react-router-dom"
import { useGetUser, useUpdateProfileImage, useUpdateUserName } from "../hooks/useUser"
import ConfirmModal from "../components/common/ConfirmModal"
import React, { useState } from "react"
import Button from "../components/common/Button"
import transactionsBell from '../assets/transactionsBell.png'
import NavBottom from "../components/common/NavBottom"
import toast from "react-hot-toast"
import InputModal from "../components/common/InputModal"

interface SettingRowProps {
    label: string
    value?: string
    onClick?: () => void
    danger?: boolean
}

const SettingRow = ({ label, value, onClick, danger = false, }: SettingRowProps) => {
    return (
        <button type="button" onClick={onClick}
            className="w-full flex items-center justify-between py-4 px-1 border-b border-[#F3DFDB] last:border-b-0">
            <div className="flex flex-col items-start gap-1">
                <span className={`text-sm font-medium ${ danger ? "text-[#E35D5D]" : "text-[#3D2C2C]"}`}>{label}</span>
                {value && (<span className="text-sm text-[#B89090]">{value}</span>)}
            </div>

            <span className={`text-lg ${danger ? "text-[#E35D5D]" : "text-[#B89090]"}`}>›</span>
        </button>
    )
}

const AccountSettingsPage = () => {

    const navigate = useNavigate()
    const { data: UserData, isLoading, error } = useGetUser()
    const { mutate: updateProfileImage } = useUpdateProfileImage()
    const { mutate: updateUserName } = useUpdateUserName()
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [isUserNameOpen, setIsUserNameOpen] = useState(false)
    const [userName, setUserName] = useState("")

    const handleProfileImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setProfileImage(file)
        updateProfileImage(file, {
            onSuccess:() => {
                toast.success('プロフィール画像を変更しました！')
                setIsUserNameOpen(false)
            },
            onError:() => {
                toast.error('プロフィール画像の変更に失敗しました。')
            }
        }) 
    }

    const handleUserNameChange = () => {
        updateUserName(userName,{
            onSuccess: () => {
                toast.success("ユーザー名を変更しました！")
                setIsUserNameOpen(false)
            },
            onError: () => {
                toast.error("ユーザー名の変更に失敗しました")
            }
        })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#B89090]">読み込み中...</p>
            </div>
        )
    }

    if (error || !UserData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#B89090]">エラーが発生しました。</p>
            </div>
        )
    }

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080"

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#FFC3B6] to-[#F8A1A1CC] flex flex-col pb-40">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-12 pb-4">
                <Button variant="back" onClick={() => navigate("/mypage")}>←</Button>
                <span className="text-[#3D2C2C] font-bold">アカウント設定</span>
                <Button variant="back" onClick={() => navigate("/settings")}><img src={transactionsBell} alt="bell-img"/></Button>
            </div>

            {/* Profile Image */}
            <div className="flex flex-col items-center px-6 pb-6">

                <div className="flex flex-col items-center mt-4">
                    <div className="w-28 h-28 relative rounded-3xl bg-[#FFB8A6] flex items-center justify-center">
                        <img src={profileImage ? URL.createObjectURL(profileImage) : `${apiUrl}${UserData.profileImage}`} alt="profile" className={`${UserData.profileImage === '/uploads/profiles/default.png' ? 
                            'w-24 h-24' : 'w-28 h-28'} rounded-3xl object-cover object-center`}/>
                        <input type="file" accept="image/*" className="hidden" id="profileImage" onChange={handleProfileImageChange}/>
                        <label htmlFor="profileImage" className='absolute -bottom-1 -right-3 bg-[#F47560] rounded-xl w-9 h-9 flex items-center justify-center cursor-pointer'>
                        <span className='text-white text-s'>📷</span>
                        </label>
                    </div>
                    <p className="text-[#3D2C2C] text-2xl font-bold mt-4">{UserData.username}</p>
                    <p className="text-[#B89090] text-sm mt-1">ちょっと変えてみる？ ✨</p>
                </div>

            </div>

            {/* Profile */}
            <section className="mb-5 px-6">
                <p className="font-bold text-[#7A5555] mb-2 ml-1">プロフィール</p>

                <div className="bg-white bg-opacity-70 rounded-2xl px-4 shadow-sm font-medium">
                    <SettingRow label="ユーザー名" value={UserData.username} onClick={() => {setIsUserNameOpen(true); setUserName(UserData.username)}}/>
                    <SettingRow label="ログインID" value={UserData.loginID ?? "ログインID"}/>
                </div>
            </section>

            {/* Security */}
            <section className="mb-5 px-6">
                <p className="font-bold text-[#7A5555] mb-2 ml-1">セキュリティ</p>

                <div className="bg-white bg-opacity-70 rounded-2xl px-4 shadow-sm font-medium">
                    <SettingRow label="パスワード変更" onClick={() => navigate("/account/password")}/>
                </div>
            </section>

            {/* Account */}
            <section className="px-6">
                <p className="font-bold text-[#7A5555] mb-2 ml-1">アカウント</p>

                <div className="bg-white bg-opacity-70 rounded-2xl px-4 shadow-sm">
                    <SettingRow label="アカウント削除" danger onClick={() => setIsDeleteOpen(true)}/>
                </div>
            </section>

            <ConfirmModal
                isOpen={isDeleteOpen}
                title="アカウント削除"
                message="アカウントを削除すると、すべてのデータが削除されます。本当に削除しますか？"
                icon="⚠️"
                confirmText="削除する"
                cancelText="キャンセル"
                onCancel={() =>
                    setIsDeleteOpen(false)
                }
                onConfirm={() => {
                    console.log("account delete")
                }}
            />

            {/* BottomNav */}
             <div className="fixed bottom-0 left-0 right-0">
                <NavBottom />
            </div>     

            <InputModal isOpen={isUserNameOpen} title="ユーザー名を変更" value={userName} placeholder="ユーザー名" 
            onChange={setUserName} onCancel={() => setIsUserNameOpen(false)} onConfirm={handleUserNameChange}
            />
        </div>
    )
}

export default AccountSettingsPage