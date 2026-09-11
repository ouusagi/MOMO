import { create } from "zustand"
import api from "../api/axios"
import type { AuthState } from "../types/auth"

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: !!localStorage.getItem('token'),

    // 로그인
    login: async(loginID, password) => {
        const res = await api.post('/api/login', {loginID, password})
        const token = res.data.token
        localStorage.setItem('token', token)
        set({isAuthenticated: true})
    },

    // 로그아웃
    logout: ()=>{
        localStorage.removeItem('token')
        set({isAuthenticated: false})
    },

    //회원가입
    signup: async( loginID, userName, password, budget, profileImage )=>{
        const formData = new FormData()

        formData.append('loginID', loginID)
        formData.append('userName', userName)
        formData.append('password', password)
        formData.append('budget', String(budget))

        if(profileImage){
            formData.append('profileImage', profileImage)
        }
        await api.post('/api/signup', formData)
    }

}))

export default useAuthStore