package controllers

import (
	"momo/config"
	"momo/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 지출 추가
func CreateExpense(c *gin.Context) {
	var input models.Expense

	// JSON 구조체 변환
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "입력값이 올바르지 않습니다"})
		return
	}

	// user_id 추출
	userID := c.MustGet("user_id").(uint)
	input.UserID = userID

	// 지출 추가
	if err := config.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "지출 추가 실패"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "지출 추가 성공 !"})
}

// 지출 조회
func GetExpense(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)
	var expenses []models.Expense

	if err := config.DB.Where("user_id = ?", userID).Find(&expenses).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "지출 조회 실패"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"expense": expenses})
}

// 지출 수정
func UpdateExpense(c *gin.Context) {
	// userID := c.MustGet("user_id").(uint)
}

// 지출 삭제
func DeleteExpense(c *gin.Context) {
	// userID := c.MustGet("user_id").(uint)
}
