export interface AuthState {
    isAuthenticated: boolean
    login: (loginID: string, password: string)=> Promise<void>
    logout: ()=> void
    signup: (loginID: string, userName: string, password: string, budget: number)=> Promise<void>
}