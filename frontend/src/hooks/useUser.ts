import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../api/axios"

interface UserGetData {
    username : string
    loginID: string
    budget : number
    profileImage: string
}

export const useGetUser = () => {
    return useQuery<UserGetData>({
        queryKey:['user'],
        queryFn: async () => {
            const res = await api.get<UserGetData>('/api/user')
            return res.data
        }
    })
}

export const useUpdateProfileImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (file:File) => {
            const formData = new FormData()
            formData.append('profileImage',file)
            const res = await api.put('api/user/profile-image',formData)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['user']})
        }
    })
}

export const useUpdateUserName = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (userName:string) => {
            // 유저명 중복 검사
            const checkRes = await api.post('/api/check-username', {"username":userName})
            if(checkRes.data.duplicate){
                throw new Error("duplicate")
            }

            // 변경된 유저명 수정 요청
            const res = await api.put('/api/user/username', {userName})
            return res.data
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['user']})
        }
    })
}

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: async () => {
            const res = await api.delete("/api/user")
            return res.data
        },
    })
}