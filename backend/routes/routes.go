package routes

import (
	"momo/controllers"
	"momo/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.POST("/api/signup", controllers.Signup)
	r.POST("/api/login", controllers.Login)

	auth := r.Group("/api")

	auth.Use(middleware.JwtMiddleware())
	{
		auth.POST("/expenses", controllers.CreateExpense)
		auth.GET("/expenses", controllers.GetExpense)
		auth.PUT("/expenses/:id", controllers.UpdateExpense)
		auth.DELETE("/expenses/:id", controllers.DeleteExpense)
	}

	return r
}
