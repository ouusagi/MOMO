package controllers

import (
	"log"
	"momo/config"
	"momo/models"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// 알림 리스트 조회
func GetNotifications(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)
	var notifications []models.Notification

	if err := config.DB.Where("user_id = ?", userID).
		Order("created_at DESC").
		Find(&notifications).Error; err != nil {
		log.Println("알림 조회 실패:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "알림 조회 실패"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"notifications": notifications})
}

// 알림 읽음으로 변경
func ReadNotifications(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)

	if err := config.DB.Model(&models.Notification{}).
		Where("user_id = ?", userID).
		Where("is_read = ?", false).
		Update("is_read", true).Error; err != nil {
		log.Println("알림 읽음 처리 실패:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "알림 읽음 처리에 실패했습니다"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "알림을 모두 읽음 처리했습니다"})
}

// 예산 초과 여부 확인 + 알림 생성
func CheckBudgetNotification(userID uint, expenseDate string) {

	// 지출 날짜에서 연도, 월 추출
	dateParts := strings.Split(expenseDate, "-")

	if len(dateParts) < 2 {
		log.Println("날짜 형식 오류:", expenseDate)
		return
	}

	year, err := strconv.Atoi(dateParts[0])

	if err != nil {
		log.Println("year 변환 실패:", err)
		return
	}

	month, err := strconv.Atoi(dateParts[1])
	if err != nil {
		log.Println("month 변환 실패:", err)
		return
	}

	// 사용자 정보 조회
	var user models.User

	if err := config.DB.First(&user, userID).Error; err != nil {
		log.Println("사용자 조회 실패:", err)
		return
	}

	// 해당 월의 총 지출 금액 계산
	var monthlyTotal int

	if err := config.DB.Model(&models.Expense{}).
		Where("user_id = ?", userID).
		Where("EXTRACT(YEAR FROM expense_date) = ?", year).
		Where("EXTRACT(MONTH FROM expense_date) = ?", month).
		Select("COALESCE(SUM(amount), 0)").
		Scan(&monthlyTotal).Error; err != nil {
		log.Fatalln("월 지출 금액 계산 실패:", err)
		return
	}

	// 총 지출금액이 예산을 초과하였는지 검사
	if monthlyTotal <= user.Budget {
		log.Println("총 지출금액 예산 초과 아님")
		return
	}

	// 해당 년도의 월에 이미 예산 초과 알림이 있었는지 확인 (중복 알림 방지 위함)
	var count int64

	if err := config.DB.Model(&models.Notification{}).
		Where("user_id = ?", userID).
		Where("type = ?", "budget_exceeded").
		Where("year = ?", year).
		Where("month = ?", month).
		Count(&count).Error; err != nil {
		log.Println("기존 알림 조회 실패", err)
		return
	}

	// 이미 알림이 있다면 생성 X
	if count > 0 {
		log.Println("이미 알림 존재함")
		return
	}

	// 새로운 예산 초과 알림 생성
	notification := models.Notification{
		UserID:  userID,
		Type:    "budget_exceeded",
		Message: "今月の予算を超過しました。\n使いすぎには注意しましょう！",
		IsRead:  false,
		Year:    year,
		Month:   month,
	}

	if err := config.DB.Create(&notification).Error; err != nil {
		log.Println("알림 생성 실패:", err)
		return
	}

	log.Println("알림 생성 성공:", notification)

}
