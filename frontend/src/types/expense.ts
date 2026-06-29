// frontend → backend: POST, PUT
export interface ExpenseInput {
    title: string
    amount: number
    category: string
    memo: string
}

// backend → frontend: GET
export interface Expense extends ExpenseInput {
    id: number
    userId: number
    createdAt: string
}