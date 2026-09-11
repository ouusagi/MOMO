package models

import "time"

// user_models
type User struct {
	ID           uint      `json:"id"`
	LoginID      string    `json:"loginId"`
	UserName     string    `json:"userName"`
	Password     string    `json:"password"`
	CreatedAt    time.Time `json:"createdAt"`
	Budget       int       `json:"budget"`
	ProfileImage string    `json:"profileImage"`
}
