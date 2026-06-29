개발 공부 노트

1. err := godotenv.Load()에서 godotenv.Load()는 env파일을 읽고 컴퓨터 메모리에 값을 저장하고 성공&실패 여부만 err에게 준다
메모리에 저장된 값은 os.getenv()로 꺼내써야 한다


2. var DB *gorm.DB 는 DB와 연결하기 위해 GORM 라이브러리에 이미 만들어져 있는 구조체를 쓰는 것
따로 구조체를 만드는 이유는 연결된 후 가져올 데이터를 형식에 맞게 쓰기 위해 만든 것


3. go에선 :=로 만든 변수명이 같은것 2개 이상 있다면 최초에 사용된값과 그 후에 사용된 값이 있다고하면
덮어쓰기를 해서 최초에 사용된값이 그 다음 사용된값으로 덮어쓰기가 되어 같은 변수명을 재활용하며 사용 할 수 있다
= := 왼쪽에 처음 등장하는 새 변수가 '최소 한 개'라도 섞여 있다면, 기존에 있던 변수는 새로 만들지 않고 값만 덮어쓴다.



4. go에선 이렇게 파라미터가 2개씩 있는것을 볼 수 있는데 첫번째 괄호는 데이터를 외부로 받아오는 데이터 파라미터이고
   두번째 괄호는 반환 할 데이터 타입을 미리 정의 해둔 것 임.
func HashPassword(password string) (string, error) {
                   ↑ 입력             ↑ 출력 타입 선언
                     외부에서 받는 값       반환할 타입 미리 정의
    hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        return "", err
    }
    return string(hashed), nil
}
와 같이 (password string) <= 이것은 일반 JS와 같이 외부로 부터 받아오는 데이터값을 담은 파라미터 
(string, error) 이 함수는 string이랑 error를 반환할거야" 라는 타입 선언


즉 func 함수명(입력값 타입) (반환타입) {
    return 반환값
}


5. bcrypt.CompareHashAndPassword(hashed, password)
                                  ↑ 1번   ↑ 2번
                                  암호화된값  평문



## JWT 서명(Signature) 알고리즘 - HS256

### 역할
토큰의 페이로드 변조를 감지하는 서명(Signature) 알고리즘

### 동작 방식
- 로그인 성공 시 페이로드 + JWT_SECRET → HS256으로 서명(Signature) 생성
- 이후 요청마다 토큰의 서명(Signature)을 다시 계산해서 비교
- 일치 → 정상 요청
- 불일치 → 변조된 토큰으로 판단, 요청 거절

### 사용 이유
- 서버가 1개인 프로젝트에 적합한 알고리즘
- JWT_SECRET 없이는 올바른 서명(Signature)을 만들 수 없음
- 페이로드를 변조하면 서명(Signature)이 달라져서 변조 감지 가능


헤더:토큰 형식 정보
페이로드:토큰안에 담긴 데이터
시그니처:서버가 JWT_SECRET으로 생성한 전자 서명

1. 담을 데이터 준비 (claims)
2. 데이터로 토큰 생성 (NewWithClaims)
3. 시크릿키로 서명해서 반환 (SignedString)



# interface{}

interface{}는 어떤 타입이든 담을 수 있는 만능 타입이다.

예를 들어

var data interface{}

라고 선언하면

data = 123
data = "hello"
data = true

처럼 int, string, bool 등 어떤 타입의 값도 저장할 수 있다.

하지만 interface{}는 어떤 타입이든 담을 수 있는 대신,
Go는 실제로 어떤 타입이 들어있는지 알 수 없다.

예를 들어

var data interface{}
data = 123

fmt.Println(data + 1)

처럼 사용하면 에러가 발생한다.

왜냐하면 Go 입장에서는 data 안에 int가 들어있는지,
string이 들어있는지 알 수 없기 때문이다.

즉 interface{}는 값을 저장할 수는 있지만,
사용하려면 실제 타입을 확인해야 한다.



# 타입 단언 (Type Assertion)

타입 단언은 interface{} 안에 들어있는 실제 타입을 확인하고 꺼내오는 기능이다.

예를 들어

var data interface{}
data = 123

num, ok := data.(int)

라고 작성하면

"data 안에 int가 들어있냐?"

를 확인한다.

만약 int가 들어있다면

num = 123
ok = true

가 된다.

반대로

data = "hello"

num, ok := data.(int)

처럼 실제 타입이 int가 아니라면

num = 0
ok = false

가 된다.

즉 타입 단언은 interface{} 안에 들어있는 값을
원래 타입으로 꺼내서 사용할 수 있게 해주는 기능이다.


# Claims

JWT에서 Payload를 Claims라고 부른다.

Claims는 JWT 안에 저장되는 사용자 정보나 데이터이다.

예시

{
  "user_id": 1,
  "exp": 1750000000
}

JWT 라이브러리에서는 Payload를 Claims라는 이름으로 관리한다.

따라서

token.Claims

는 JWT 안에 저장된 Payload를 의미한다.

JWT를 검증한 후

claims, ok := token.Claims.(jwt.MapClaims)

와 같이 타입 단언을 통해 Claims(Payload)를 꺼내 사용할 수 있다.


token 안에 원래 Claims(Payload)가 들어있는데,
Claims는 인터페이스 형태라 바로 사용할 수 없어서
jwt.MapClaims 타입으로 타입 단언을 하고,
꺼낸 값을 claims 변수에 저장한 뒤 반환하는 것이다.


## 각 메서드 & 함수 뜻 정의
[]byte(password) → 문자열을 바이트로 변환 (bcrypt가 바이트만 받음)
bcrypt.DefaultCost → 암호화 강도 (기본값 10, 높을수록 강하지만 느림)
bcrypt.CompareHashAndPassword → DB에 저장된 암호화된 비밀번호랑 입력한 비밀번호를 비교해주는 함수
jwt.NewWithClaims → 토큰 만드는 함수
claims          → 페이로드 만들기
NewWithClaims   → 헤더 + 페이로드 합치기
SignedString    → 서명(Signature) 붙여서 토큰 완성
SignedString → 시크릿키로 토큰에 서명
ParseWithClaims(검증할 토큰, 페이로드에 담을 형식, JWT 검증할 때 사용할 비밀키 함수) → 토큰을 분해하여 검증하는 함수
*gin.Context → 요청가 응답을 할 수 있게 해주는 객체
ShouldBindJSON → 받은 JSON형태를 구조체형태로 변환시켜줌

http.StatusBadRequest → 400 상태코드 (잘못된 요청)
gin.H{} → 응답할 JSON 데이터 [응답을 보낼 땐 항상 (상태코드,응답데이터)]


## 포인터 사용법
& → 원본 주소를 넘겨서 원본 자체를 수정하고 싶을 때
함수에서 넘길 때 원본 수정 → & 필요
내가 직접 원본 필드 수정 → & 불필요 (이미 원본)

var input models.User  // 여기서 input 원본 선언
// 내가 직접 접근 → 이미 원본이니까 & 불필요
input.Password = hashed  // input 원본 바로 접근

// 함수에 넘길 때 → & 붙여야 함수 안에서 원본 접근 가능
c.ShouldBindJSON(&input)
config.DB.Create(&input)




## 상태 코드
http.StatusOK                  // 200 = 요청 성공
http.StatusCreated             // 201 = 데이터 생성 성공
http.StatusBadRequest          // 400 = 잘못된 요청
http.StatusUnauthorized        // 401 = 인증 실패 (로그인 필요)
http.StatusForbidden           // 403 = 접근 권한 없음
http.StatusNotFound            // 404 = 요청한 리소스 없음
http.StatusInternalServerError // 500 = 서버 내부 오류


## 로그인/회원가입/로그아웃 상태 흐름

흐름 정리
로그인 컴포넌트
→ 아이디/비밀번호 입력받음
→ authStore login(loginID, password) 호출
        ↓
authStore login 함수
→ 파라미터로 받아서
→ api.post('/api/login', { loginID, password })
        ↓
axios 인터셉터
→ 토큰 없으니까 그냥 통과
        ↓
routes.go에서 '/api/login' 해당 url로 요청 확인 후 controllers.Login로 이동
        ↓
백엔드
→ 아이디/비밀번호 검증
→ 토큰 발급해서 반환 (반환 시 axois에서는 res로 반환함)
        ↓
authStore
→ 토큰 localStorage 저장
→ set({ isAuthenticated: true })
        ↓
로그인 컴포넌트
→ 메인 페이지로 이동

({}) 이렇게 객체를 괄호로 감싼 이유는 
()=>{} 이렇게 감싸지 않고 사용할 시 함수 본문을 실행하겠다는 뜻으로
({}) 이렇게 객체를 괄호로 감싸야 객체를 반환할 수 있고, 그 반환된 객체를 Zustand가 전역 상태로 만들기 때문

()=>{}
↓
함수 본문

()=>({})
↓
객체 반환

반환된 객체
↓
Zustand Store 생성
↓
전역 상태 사용 가능