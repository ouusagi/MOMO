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