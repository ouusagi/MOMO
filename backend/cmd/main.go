package main

import (
	"momo/config"
	"momo/routes"
)

func main() {
	config.ConnectDB()

	r := routes.SetupRouter()

	r.Run(":8080")
}
