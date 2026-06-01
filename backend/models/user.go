package models

import "time"

// user_models
type User struct {
	ID        uint
	LoginID   string
	UserName  string
	Password  string
	CreatedAt time.Time
	Budget    int
}
