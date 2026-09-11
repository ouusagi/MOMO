package routes

import (
	"momo/controllers"
	"momo/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Static("/uploads", "./uploads")

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))

	r.POST("/api/signup", controllers.Signup)
	r.POST("/api/login", controllers.Login)
	r.POST("/api/check-id", controllers.CheckUserID)
	r.POST("/api/check-username", controllers.CheckUserNames)

	auth := r.Group("/api")

	auth.Use(middleware.JwtMiddleware())
	{
		auth.POST("/expenses", controllers.CreateExpense)

		auth.GET("/expenses", controllers.GetExpense)
		auth.GET("/user", controllers.GetUser)

		auth.PUT("/expenses/:id", controllers.UpdateExpense)
		auth.DELETE("/expenses/:id", controllers.DeleteExpense)
	}

	return r
}
