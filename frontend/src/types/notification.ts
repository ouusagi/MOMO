export interface Notification {
    id: number
    userId: number
    type: string
    message: string
    isRead: boolean
    year: number
    month: number
    createdAt: string
}