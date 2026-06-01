package models

import "time"

// user_expense_models
type Expense struct {
	ID        uint
	UserID    uint
	Title     string
	Amount    int
	Category  string
	Memo      string
	createdAt time.Time
}
