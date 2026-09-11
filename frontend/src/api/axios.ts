import axios from "axios";

// baseURL 생성
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080'
})

// 요청 인터셉터 - 토큰 자동 추가
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use((res)=> res, (error)=>{
    if (error.response?.status === 401){
        if (error.config?.url?.includes('/api/login')) {
                return Promise.reject(error)
            }
            localStorage.removeItem("token")
            window.location.href = "/login"
    }
    return Promise.reject(error)
})

export default api