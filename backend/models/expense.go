package models

import "time"

// user_expense_models
type Expense struct {
	ID          uint      `json:"id"`
	UserID      uint      `json:"userId"`
	Title       string    `json:"title"`
	Amount      int       `json:"amount"`
	Category    string    `json:"category"`
	Memo        string    `json:"memo"`
	ExpenseDate string    `json:"expenseDate"`
	CreatedAt   time.Time `json:"createdAt"`
}
