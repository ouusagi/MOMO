import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../api/axios"
import type { Notification } from "../types/notification"

// 알림 조회
export const useGetNotifications = () => {
    return useQuery<Notification[]>({
        queryKey:["notifications"],
        queryFn: async () => {
            const res = await api.get("/api/notifications")
            console.log("전체 응답:", res.data)
            console.log("notifications:", res.data.notifications)
            return res.data.notifications
        }
    })
}


// 모든 알림 읽음 처리
export const useReadNotifications = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            const res = await api.put("/api/notifications/read")
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["notifications"]})
        }
    })
}