// frontend → backend: POST, PUT

export type ConsumptionType = 'mood' | 'impulse' | 'necessary' | 'reward'

export type ConsumptionEmotion = 'happy' | 'satisfied' | 'relaxed' | 'excited' | 'sad' | 'stressed'

export interface ExpenseInput {
    title: string
    amount: number
    category: string
    memo?: string
    expenseDate: string
    consumptionType?: ConsumptionType
    consumptionEmotion?: ConsumptionEmotion
}

// backend → frontend: GET
export interface Expense extends ExpenseInput {
    id: number
    userId: number
    createdAt: string
}