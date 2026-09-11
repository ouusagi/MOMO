package storage

import (
	"fmt"
	"mime/multipart"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

func SaveProfileImageLocal(c *gin.Context, file *multipart.FileHeader) (string, error) {
	// 원본 파일 확장자 가져오기 (파일명 변경되어도 확장자 유지하기 위함)
	ext := filepath.Ext(file.Filename)

	// 새로운 이름 생성 (파일명 중복 방지)
	fileName := fmt.Sprintf("profile_%d%s", time.Now().UnixNano(), ext)

	// 파일 저장 위치
	savePath := filepath.Join("uploads", "profiles", fileName)

	// 파일 저장
	if err := c.SaveUploadedFile(file, savePath); err != nil {
		return "", err
	}

	// DB 저장
	imagePath := "/uploads/profiles/" + fileName

	return imagePath, nil
}
