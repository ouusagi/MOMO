import { useNavigate } from "react-router-dom"
import { useGetNotifications } from "../../hooks/useNotification"
import transactionsBell from "../../assets/transactionsBell.png"
import Button from "./Button"

const NotificationButton = () => {
    const navigate = useNavigate()
    const { data: notifications = [] } = useGetNotifications()

    const hasUnread = notifications.some((notification) => !notification.isRead)

    return (
        <div className="relative">
            <Button variant="back" onClick={() => navigate("/notifications")}>
                <img src={transactionsBell} alt="notification" />
            </Button>

            {hasUnread && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full pointer-events-none" />
            )}
        </div>
    )
}

export default NotificationButton