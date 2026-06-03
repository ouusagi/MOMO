package controllers

import (
	"momo/config"
	"momo/models"
	"momo/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Signup(c *gin.Context) {
	var input models.User

	// JSON => 구조체 변환
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "입력값이 올바르지 않습니다"})
		return
	}

	// 패스워드 암호화
	hashed, err := utils.HashPassword(input.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "서버에 에러가 발생하였습니다"})
		return
	}

	// 데이터 DB에 저장
	input.Password = hashed
	if err := config.DB.Create(&input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "서버에 에러가 발생하였습니다"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "회원가입에 성공 하였습니다 !"})

}

func Login(c *gin.Context) {
	var input models.User

	// JSON => 구조체 변환
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "입력값이 올바르지 않습니다"})
		return
	}

	// DB 유저 찾기
	var user models.User
	if err := config.DB.Where("login_id = ?", input.LoginID).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "아이디가 존재하지 않습니다"})
		return
	}

	// 패스워드 검증
	if !utils.CheckPassword(input.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "패스워드가 일치하지 않습니다"})
		return
	}

	// 토큰 발급
	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "JWT토큰 발급 에러"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})

}
