# Go 빌드 환경
FROM golang:1.26 AS builder

WORKDIR /app

# 의존성 파일 복사
COPY go.mod go.sum ./
RUN go mod download

# 백엔드 소스 복사
COPY . .

# 실행 파일 빌드
RUN CGO_ENABLED=0 GOOS=linux go build -o momo ./cmd/main.go

# 실행 전용 이미지
FROM debian:bookworm-slim

WORKDIR /app

# HTTPS 인증서 및 시간대 데이터 설치
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates tzdata \
    && rm -rf /var/lib/apt/lists/*

# 빌드 결과물 복사
COPY --from=builder /app/momo ./momo

# 프로필 디폴트 이미지 복사
RUN mkdir -p ./uploads/profiles
COPY assets/default.png ./uploads/profiles/default.png

EXPOSE 8080

CMD ["./momo"]
