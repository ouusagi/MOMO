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