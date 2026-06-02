package utils

import (
	"errors"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// add Token
func GenerateToken(userID uint) (string, error) {

	//add PayLoad
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(),
	}

	// add Header + PayLoad + Signature
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

// Validate Token
func ValidateToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, jwt.MapClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		log.Println("JWT 파싱 및 검증 실패")
		return nil, err
	}

	if !token.Valid {
		log.Println("유효하지 않은 토큰")
		return nil, errors.New("invalid token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)

	if !ok {
		log.Println("Claims 타입 단언 실패")
		return nil, errors.New("invalid claims")
	}

	return claims, nil
}
