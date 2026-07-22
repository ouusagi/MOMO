package controllers

import (
	"momo/config"
	"momo/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CheckUserID(c *gin.Context) {

	var input struct {
		LoginID string `json:"loginID"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	var user models.User

	err := config.DB.Where("login_id = ?", input.LoginID).First(&user).Error
	if err == nil {
		c.JSON(http.StatusOK, gin.H{"duplicate": true})
		return
	}

	c.JSON(http.StatusOK, gin.H{"duplicate": false})
}
