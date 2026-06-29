import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Expense, ExpenseInput } from "../types/expense"
import api from "../api/axios"

// read(Get)
export const useGetExpenses = () => {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: async():Promise<Expense[]> => {
            const res = await api.get('/api/expenses')
            return res.data.expenses
        }
    })
}

// create(Post)
export const useCreateExpenses = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data:ExpenseInput) => api.post('/api/expenses', data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['expenses']})
        }
    })
}

// update(Put)
export const useUpdateExpense = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id, data}:{id:number, data:ExpenseInput}) => api.put(`/api/expenses/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['expenses']})
        }
    })
}

// delete
export const useDeleteExpense = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(id:number) => api.delete(`/api/expenses/${id}`),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['expenses']})
        }
    })
}