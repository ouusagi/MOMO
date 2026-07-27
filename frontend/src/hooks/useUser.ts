import { useQuery } from "@tanstack/react-query"
import api from "../api/axios"

interface UserGetData {
    username : string
    budget : number
}

export const useGetUser = () => {
    return useQuery<UserGetData>({
        queryKey:['user'],
        queryFn: async() => {
            const res = await api.get<UserGetData>('/api/user')
            return res.data
        }
    })
}