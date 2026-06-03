package utils

import "golang.org/x/crypto/bcrypt"

// 패스워드 암호화
func HashPassword(password string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}

// 패스워드 검증
func CheckPassword(hashed string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))
	if err != nil {
		return false
	}
	return true
}
