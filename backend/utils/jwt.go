package utils

import (
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

	// add Header + PayLoad
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}
