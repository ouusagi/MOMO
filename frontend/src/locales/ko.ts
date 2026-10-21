const ko = {
  common: {
    save: "저장",
    cancel: "취소",
    delete: "삭제",
    edit: "수정",
    decision: "선택",
  },

  nav: {
    home: "홈",
    profile: "프로필",
    add: "추가",
    calendar: "캘린더",
    graph: "그래프",
  },

  welcome: {
    title: "오늘의 지출",
    subtitle: "MOMO에 기록해 봐요!",
    signin: "로그인",
    signup: "회원가입",
  },

  signin: {
    signinError: "사용자 ID 혹은 비밀번호가 일치하지 않습니다."
  },

  signup: {
    // 단계 표시
    step: "단계",
    stepTitle: "사용자 ID 입력",

    // 환영 메시지
    welcomeGreeting: "안녕하세요 !",
    welcomeTitle: "에 어서와요!",
    welcomeSubtitle: "함께 시작해 봐요 🍑",
    userIdDescription: "사용자 ID를 입력해 주세요",

    // 입력 폼
    userIdLabel: "사용자 ID",
    userIdPlaceholder: "momo@gmail.com",
    passwordLabel: "비밀번호",
    passwordPlaceholder: "••••••••",
    passwordConfirmLabel: "비밀번호 재입력",

    // 이용약관 및 동의
    termsAgreement: "(필수) 서비스 이용약관에 동의합니다",
    termsView: "보기 ›",
    termsTitle: "서비스 이용약관",
    termsClose: "닫기",
    marketingAgreement: "(선택) 마케팅 정보 수신에 동의합니다",

    // 버튼 및 로그인 안내
    nextButton: "다음 →",
    loginPrompt: "이미 계정이 있으신가요?",
    loginButton: "로그인",

    // 오류 메시지
    errorRequired: "모든 항목을 입력해 주세요",
    errorPasswordMismatch: "비밀번호가 일치하지 않습니다",
    errorInvalidEmail: "이메일 형식이 올바르지 않습니다",
    errorPasswordLength: "비밀번호는 8자 이상 입력해 주세요",
    errorTermsRequired: "이용약관에 동의해 주세요",
    errorDuplicateUserId: "이미 등록된 ID입니다",

    // 이용약관 본문
    terms: [
      {
        title: "제1조 (목적)",
        content:
          "본 약관은 MOMO(이하 '서비스')의 이용 조건을 정하는 것입니다.",
      },
      {
        title: "제2조 (이용 등록)",
        content:
          "가입 희망자가 본 약관에 동의한 후 정해진 방법으로 이용 등록을 신청하고, 당사가 이를 승인하면 이용 등록이 완료됩니다.",
      },
      {
        title: "제3조 (개인정보 처리)",
        content:
          "당사는 이용자의 개인정보를 적절하게 관리하며 제3자에게 제공하지 않습니다.",
      },
      {
        title: "제4조 (금지 사항)",
        content:
          "이용자는 다음 행위를 해서는 안 됩니다.・법령 또는 공서양속에 위배되는 행위・다른 사용자에게 피해를 주는 행위",
      },
      {
        title: "제5조 (면책 사항)",
        content:
          "당사는 서비스와 관련하여 발생한 손해에 대해 일절 책임을 지지 않습니다.",
      },
      {
        title: "제6조 (약관 변경)",
        content: "당사는 필요한 경우 본 약관을 변경할 수 있습니다.",
      },
    ],

    // 프로필 설정 (Step 2)
    step2Title: "프로필 설정",
    step2Welcome: "거의 다 왔어요 !",
    step2Subtitle: "프로필을 설정해 주세요 🍑",

    // 프로필 이미지
    profileImageAlt: "프로필 이미지",
    profileImageUpload: "프로필 이미지 선택",

    // 닉네임
    userNameLabel: "닉네임",
    userNamePlaceholder: "MOMO01",
    userNameRequired: "닉네임을 입력해 주세요",
    userNameMaxLength: "닉네임은 10자 이하로 입력해 주세요",
    userNameDuplicate: "이미 등록된 닉네임입니다",

    // 월간 예산
    monthlyBudgetLabel: "월간 예산 설정",
    monthlyBudgetPlaceholder: "300,000",
    monthlyBudgetOptional: "나중에 설정할 수 있습니다.",
    currency: "원",

    // 통화 선택
    currencyLabel: "통화",
    currencyJPY: "🇯🇵 일본 엔화 (YEN/¥)",
    currencyKRW: "🇰🇷 한국 원화 (KRW/￦)",

    // 버튼
    step2SubmitButton: "🍑 시작하기!",

    // 가입 완료 (Step 3)
    step3Title: "가입 완료 !",
    step3Welcome: "님, 환영합니다 🎉",
    step3Subtitle: "자, 이제 MOMO와 함께\n절약하는 습관을 만들어 봐요 !",

    // 주요 기능 소개
    featureReceipt: "영수증을 촬영하면 자동으로 기록",
    featureCalendar: "캘린더에서 지출을 한눈에 확인",
    featureStatistics: "통계로 소비 패턴 분석",

    // 버튼
    step3HomeButton: "메인 화면으로 이동 🍑",
  },

  expenseAdd: {
    title: "지출 추가",
    amount: "금액",
    category: "카테고리",
    memo: "메모",
    date: "날짜",
  },

  transaction: {
    title: "지출 내역",
    empty: "지출 내역이 없습니다",
  },

  profile: {
    title: "프로필",
    logout: "로그아웃",
    changePassword: "비밀번호 변경",
  },

  main: {
    // 헤더
    greeting: "안녕하세요!",

    // 지출 요약
    monthlyExpenseTitle: "이번 달 지출 금액",

    // 카테고리
    categories: {
    food: '식비',
    cafe: '카페',
    transport: '교통',
    shopping: '쇼핑',
    rent: '월세',
    medicine: '의약품',
    hobby: '취미',
    other: '기타',
    },

    // 지출 그래프
    weeklyExpenseGraphTitle: " 지출 그래프",
    weeklyExpenseGraphEmpty: "지출 데이터가 없습니다",

    // 오늘의 지출
    todayExpenseTitle: "오늘의 지출",
    viewAll: "전체 보기 ›",
    todayExpenseEmpty: "오늘은 지출 내역이 없어요!",

    // 로딩 및 오류
    loading: "불러오는 중...",
    error: "오류가 발생했습니다",
  },

  enterDirectly: {
    title: "직접 입력",
    complete: "완료",

    amountLabel: "금액",
    amountEditHint: "탭하여 수정",

    shopLabel: "가게명",
    shopPlaceholder: "스타벅스",

    memoLabel: "메모 (선택)",
    memoPlaceholder: "아이스 아메리카노 주문 ☕",

    dateLabel: "날짜 (탭하여 수정)",
    categoryTitle: "카테고리 선택",

    dateChoice: "날짜 선택",

    categories: {
      food: "식비",
      cafe: "카페",
      transport: "교통",
      shopping: "쇼핑",
      rent: "월세",
      medicine: "의약품",
      hobby: "취미",
      other: "기타",
    },

    receiptCapture: "영수증 촬영",
    selectPhoto: "사진 선택",

    receiptNotice:
      "인식 결과가 정확하지 않을 수 있습니다. \n저장하기 전에 내용을 확인해 주세요.",

    requiredFieldsError: "모든 항목을 입력해 주세요",
    saveSuccess: "지출이 추가되었습니다 !",
    saveFailure: "지출 추가에 실패했습니다.",
    saveError: "저장에 실패했습니다",

    ocrLoadingTitle: "영수증 분석 중...",
    ocrLoadingWait: "잠시만 기다려 주세요.",
    ocrAccuracyNotice:
      "인식 결과가 정확하지 않을 수 있습니다.\n내용을 확인해 주세요.",
  },

  transactions: {
    title: "전체 내역",
    all: "전체",
    today: "오늘",
    yesterday: "어제",
    loading: "불러오는 중...",
    error: "오류가 발생했습니다",

    categories: {
      all: "모두",
      food: "식비",
      cafe: "카페",
      transportation: "교통",
      shopping: "쇼핑",
      medicine: "의약품",
      rent: "월세",
      hobby: "취미",
      other: "기타",
    },
  },

  transactionDetail: {
    title: "지출 상세",
    complete: "완료",
    detailHistory: "상세 내역",

    shopName: "가게명",
    category: "카테고리",
    date: "날짜",
    memo: "메모",

    editButton: "✏️ 수정",
    deleteButton: "🗑 삭제",

    deleteConfirmTitle: "지출을 삭제할까요?",
    deleteConfirmMessage: "삭제한 지출은 복구할 수 없습니다",

    cancel: "취소",
    delete: "삭제하기",

    deleteSuccess: "삭제가 완료되었습니다 !",
    updateSuccess: "지출이 수정되었습니다 !",
    error: "오류가 발생했습니다",
    loading: "불러오는 중...",
    loadError: "오류가 발생했습니다.",
    notFound: "지출 정보를 찾을 수 없습니다.",
  },

  editModal: {
    title: "지출 수정",
    save: "저장",
    shopName: "가게명",
    amount: "금액",
    amountPlaceholder: "0",
    memoLabel: "메모 (선택)",
    memoPlaceholder: "메모를 입력해 주세요",
    date: "날짜",
    dateEditHint: "날짜 (탭하여 수정)",
    saveButton: "저장하기",
    requiredFieldsError: "내용을 입력해 주세요",
  },

  notificationPage: {
    title: "알림",
    loading: "불러오는 중...",
    error: "오류가 발생했습니다.",
    new: "NEW",
    emptyTitle: "알림이 없습니다",
    emptyMessage: "새로운 알림이 도착하면 여기에 표시됩니다",

    budgetExceeded: {
    title: "예산 초과 알림",
    message: "이번 달 예산을 초과했습니다.\n과도한 지출이 되지 않도록 주의해요 !",
  },
  },

  myPage: {
    loading: "불러오는 중...",
    error: "오류가 발생했습니다.",
    userNotFound: "사용자 정보를 찾을 수 없습니다.",
    budgetSettings: "예산 설정",
    accountSettings: "계정 설정",
    title: "프로필",
    profileMessage: "오늘도 차근차근 절약 중 🍑",
    monthlyCount: "이번 달 기록 수",
    currency: "￦",
    monthlyBudget: "이번 달 예산",
    totalExpenseCount: "누적 기록 수",
    signOut: "로그아웃",
    signOutConfirmTitle: "로그아웃",
    signOutConfirmMessage: "정말 로그아웃 하시겠습니까?",
    cancel: "취소",
  },

  budgetUpdatePage: {
    loading: "불러오는 중...",
    error: "오류가 발생했습니다.",
    userNotFound: "사용자 정보를 찾을 수 없습니다.",
    title: "예산 설정",
    pageTitle: "월간 예산 변경",
    pageDescription: "새로운 월간 예산을 입력해 주세요",
    budgetLabel: "월간 예산",
    budgetPlaceholder: "월간 예산을 입력해 주세요",
    currentBudget: "현재 월간 예산",
    updateButton: "변경하기",
    updateSuccess: "예산이 변경되었습니다 !",
    updateFailure: "예산 변경에 실패했습니다",
    requiredError: "예산을 입력해 주세요",
    minimumError: "예산은 1원 이상 입력해 주세요",
    info: "※ 월간 예산은 언제든지 변경할 수 있습니다",
  },

  accountSettingsPage: {
    loading: "불러오는 중...",
    error: "오류가 발생했습니다.",
    title: "계정 설정",
    profileMessage: "조금 바꿔 볼까요? ✨",
    profile: "프로필",
    username: "닉네임",
    loginId: "계정 ID",
    security: "보안",
    changePassword: "비밀번호 변경",
    passwordChangeTitle: "비밀번호 변경",
    passwordChangeDescriptions: "모든 항목을 입력해주세요",
    passwordChangeDescription: "현재 비밀번호와 새로운 비밀번호를 입력해주세요",
    passwordChangeInputPlaceholder1: "현재 비밀번호",
    passwordChangeInputPlaceholder2: "새로운 비밀번호",
    passwordChangeInputPlaceholder3: "새로운 비밀번호 (재입력)",
    passwordChangeDiscrepancy: "입력한 비밀번호가 일치하지 않습니다",
    passwordChangeCondition: "비밀번호는 8자 이상 입력해주세요",
    passwordChangeonSuccess: "비밀번호를 변경 했습니다 !",
    currentPasswordIncorrect: "현재 비밀번호가 올바르지 않습니다.",
    passwordChangeonError: "비밀번호 변경에 실패 했습니다",
    passwordChangeCancel: "취소",
    passwordChangeSave: "저장하기",
    account: "계정",
    deleteAccount: "계정 삭제",
    deleteAccountTitle: "계정 삭제",
    deleteAccountMessage:
      "계정을 삭제하면 모든 데이터가 삭제됩니다. \n 정말 삭제하시겠습니까?",
    deleteButton: "삭제하기",
    cancel: "취소",
    changeUsernameTitle: "닉네임 변경",
    changeUsernameTitlesub: "새로운 닉네임을 입력해 주세요",
    usernamePlaceholder: "닉네임",
    usernameRequired: "닉네임을 입력해 주세요",
    usernameUpdateSuccess: "닉네임이 변경되었습니다 !",
    usernameUpdateFailure: "닉네임 변경에 실패했습니다",
    profileImageUpdateSuccess: "프로필 이미지가 변경되었습니다 !",
    profileImageUpdateFailure: "프로필 이미지 변경에 실패했습니다.",
    deleteAccountSuccess: "계정이 삭제되었습니다...",
    deleteAccountFailure: "계정 삭제에 실패했습니다",
  },

  calendarPage: {
    loading: "불러오는 중...",
    error: "오류가 발생했습니다.",
    userNotFound: "사용자 정보를 찾을 수 없습니다.",
    title: "캘린더",
    budget: "예산",
    remainingBudget: "남은 예산",
    selectedDateExpenses1: "월 총지출",
    selectedDateExpenses2: "일 지출",
    selectedDateExpenses3: "월",
    viewAll: "전체 보기",
    noExpenses: "이 날은 지출 내역이 없어요 !",
  },

  graphPage: {
    title: "그래프",
    weekly: "주간",
    monthly: "월간",
    yearly: "연간",
    thisWeek: "이번 주",
    thisMonth: "이번 달",
    thisYear: "올해",
    expenseGraphTitle: " 지출 그래프",
    categoryExpenseTitle: " 카테고리별 지출",
    topExpenseTitle: "지출이 많은 TOP 3",
    loading: "불러오는 중...",
    error: "오류가 발생했습니다",
    noExpenseData: "지출 데이터가 없습니다",
  },
};

export default ko;
