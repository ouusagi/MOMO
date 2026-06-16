import { create } from "zustand"
import api from "../api/axios"

interface AuthState {
    isAuthenticated: boolean
    login: (loginID: string, password: string)=> Promise<void>
    logout: ()=> void
    signup: (loginID: string, userName: string, password: string, budget: number)=> Promise<void>
}

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
    signup: async( loginID, userName, password, budget )=>{
        await api.post('/api/signup', {loginID, userName, password, budget})
    }

}))

export default useAuthStore