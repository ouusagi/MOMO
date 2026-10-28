package main

import (
	"log"
	"momo/config"
	"momo/models"
	"momo/routes"
)

func main() {
	config.ConnectDB()

	err := config.DB.AutoMigrate(
		&models.User{},
		&models.Expense{},
		&models.Notification{},
	)
	if err != nil {
		log.Fatal("테이블 생성 실패: ", err)
	}

	r := routes.SetupRouter()

	r.Run(":8080")
}
