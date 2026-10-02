import { useNavigate } from "react-router-dom"
import Button from "../components/common/Button"
import { useGetNotifications, useReadNotifications } from "../hooks/useNotification"
import { useEffect } from "react"
import { notificationIcons } from "../constants/notificationIcons"

const NotificationPage = () => {
    const navigate = useNavigate()
    const { data: notifications = [], isLoading, error } = useGetNotifications()
    const { mutate: readNotifications } = useReadNotifications()

    useEffect(()=>{
        if(notifications.some((notification)=> !notification.isRead)) {
            readNotifications()
        }
    },[notifications, readNotifications])
    

    const formatDate = (date:string) => {
        const newDate = new Date(date)

        const year = newDate.getFullYear()
        const month = String(newDate.getMonth() + 1).padStart(2, "0")
        const day = String(newDate.getDate()).padStart(2, "0")

        return `${year}/${month}/${day}`
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#B89090]">読み込み中...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#B89090]">エラーが発生しました。</p>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#FFC3B6] to-[#F8A1A1CC] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-12 pb-4">
                <Button variant="back" onClick={() => navigate(-1)}>←</Button>
                <span className="text-[#3D2C2C] font-bold">お知らせ</span>
                <div className="w-10" />
            </div>

            {/* Notification List */}
            <div className="flex flex-col gap-3 px-5 pb-10 pt-5">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div key={notification.id} className="relative flex items-start gap-4 bg-white/90 rounded-2xl px-5 py-4 shadow-sm">
                            
                            {/* Unread Dot */}
                            {!notification.isRead && (<span className="absolute top-4 left-5 w-2 h-2 bg-[#F47560] rounded-full" />)}

                            {/* Icon */}
                            <div className="w-10 h-10 shrink-0 rounded-full bg-[#FFE6DE] flex items-center justify-center">
                                <img src={notificationIcons[notification.type]} alt="notification" className="w-7 h-7" />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-[#3D2C2C] font-bold text-sm">予算超過のお知らせ</p>
                                    {!notification.isRead && (<span className="text-[11px] text-[#F47560] font-semibold">NEW</span>)}
                                </div>

                                <p className="mt-1 text-sm text-[#7A5555] leading-5 whitespace-pre-line">{notification.message}</p>
                                <p className="mt-2 text-xs text-[#B89090]">{formatDate(notification.createdAt)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center pt-32">
                            <div className="w-14 h-14 shrink-0 rounded-full bg-[#FFE6DE] flex items-center justify-center">
                                <img src={notificationIcons["default"]} alt="notification" className="w-7 h-7" />
                            </div>
                        <p className="mt-4 text-[#3D2C2C] font-semibold">お知らせはありません</p>
                        <p className="mt-1 text-sm text-[#7A5555]">新しいお知らせが届くとここに表示されます</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NotificationPage