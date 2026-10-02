package models

import "time"

type Notification struct {
	ID        uint      `json:"id"`
	UserID    uint      `json:"userId"`
	Type      string    `json:"type"`
	Message   string    `json:"message"`
	IsRead    bool      `json:"isRead"`
	Year      int       `json:"year"`
	Month     int       `json:"month"`
	CreatedAt time.Time `json:"createdAt"`
}
