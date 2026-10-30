const ja = {
  common: {
    save: "保存",
    cancel: "キャンセル",
    delete: "削除",
    edit: "編集",
    decision: "決定",
  },

  nav: {
    home: "ホーム",
    profile: "プロフィール",
    add: "追加",
    calendar: "カレンダー",
    graph: "グラフ",
  },

  welcome: {
    title: "今日の支出",
    subtitle: "MOMOにメモしよう！",
    signin: "ログイン",
    signup: "新規登録",
  },

  signin: {
    signinError: "IDまたはパスワードが正しくありません",
  },

  signup: {
    // ステップ表示
    step: "段階",
    stepTitle: "ユーザーID 入力",

    // ウェルカムメッセージ
    welcomeGreeting: "こんにちは！",
    welcomeTitle: "へようこそ！",
    welcomeSubtitle: "一緒に始めましょう 🍑",
    userIdDescription: "ユーザーIDを入力してください",

    // 入力フォーム
    userIdLabel: "ユーザーID",
    userIdPlaceholder: "momo@gmail.com",
    passwordLabel: "パスワード",
    passwordPlaceholder: "••••••••",
    passwordConfirmLabel: "パスワード再入力",

    // 利用規約・同意
    termsAgreement: "(必須) サービス利用規約に同意します",
    termsView: "見る ›",
    termsTitle: "サービス利用規約",
    termsClose: "閉じる",
    marketingAgreement: "(選択) マーケティング情報受信に同意します",

    // ボタン・ログイン案内
    nextButton: "次へ →",
    loginPrompt: "すでにアカウントをお持ちですか？",
    loginButton: "ログイン",

    // エラーメッセージ
    errorRequired: "全ての項目を入力してください",
    errorPasswordMismatch: "パスワードが一致しません",
    errorInvalidEmail: "メールアドレスの形式が正しくありません",
    errorPasswordLength: "パスワードは8文字以上入力してください",
    errorTermsRequired: "利用規約に同意してください",
    errorDuplicateUserId: "すでに登録されているIDです",

    // 利用規約本文
    terms: [
      {
        title: "第1条（目的）",
        content:
          "本規約は、MOMO（以下「本サービス」）の利用条件を定めるものです。",
      },
      {
        title: "第2条（利用登録）",
        content:
          "登録希望者が本規約に同意の上、所定の方法によって利用登録を申請し、当社がこれを承認することによって利用登録が完了します。",
      },
      {
        title: "第3条（個人情報の取扱いおよび端末の権限）",
        content:
          "当社は、サービスの提供に必要な範囲で、利用者の個人情報を取り扱います。利用者は、レシートのOCR機能を利用するために、カメラまたは写真ライブラリへのアクセスを許可することができます。これらの権限は、レシートの撮影または選択、および支出情報の認識を目的として使用されます。レシート画像は利用者の端末内でOCR処理され、OCR処理のために当社のサーバーへ送信されることはありません。利用者は端末の設定からこれらの権限を変更することができます。なお、権限を許可しない場合、当該機能の一部をご利用いただけないことがあります。",
      },
      {
        title: "第4条（禁止事項）",
        content:
          "利用者は以下の行為を行ってはなりません。・法令または公序良俗に違反する行為・他のユーザーへの迷惑行為",
      },
      {
        title: "第5条（免責事項）",
        content:
          "当社は、本サービスに関して生じた損害について、一切の責任を負いません。",
      },
      {
        title: "第6条（規約の変更）",
        content: "当社は、必要に応じて本規約を変更することができます。",
      },
    ],

    // プロフィール設定（Step 2）
    step2Title: "プロフィールを設定",
    step2Welcome: "あと少しです！",
    step2Subtitle: "プロフィールを設定してください🍑",

    // プロフィール画像
    profileImageAlt: "プロフィール画像",
    profileImageUpload: "プロフィール画像を選択",

    // ユーザーネーム
    userNameLabel: "ユーザーネーム",
    userNamePlaceholder: "MOMO01",
    userNameRequired: "ユーザーネームを入力してください",
    userNameMaxLength: "ユーザー名は10文字以下で入力してください",
    userNameDuplicate: "すでに登録されているユーザーネームです",

    // 月間予算
    monthlyBudgetLabel: "月間予算の設定",
    monthlyBudgetPlaceholder: "300,000",
    monthlyBudgetOptional: "後で設定可能です",
    currency: "円",

    // 通貨選択
    currencyLabel: "通貨",
    currencyJPY: "🇯🇵 日本円 (YEN/¥)",
    currencyKRW: "🇰🇷 韓国ウォン (KRW/￦)",

    // ボタン
    step2SubmitButton: "🍑 はじめる！",

    // 登録完了（Step 3）
    step3Title: "登録完了！",
    step3Welcome: "さん、ようこそ 🎉",
    step3Subtitle: "さあ、MOMOと一緒に\n節約習慣を身につけましょう！",

    // 主な機能紹介
    featureReceipt: "レシートを撮影すると自動記録",
    featureCalendar: "カレンダーで一目で支出を確認",
    featureStatistics: "統計で消費パターンを分析",

    // ボタン
    step3HomeButton: "メイン画面へ移動 🍑",
  },

  expenseAdd: {
    title: "支出を追加",
    amount: "金額",
    category: "カテゴリー",
    memo: "メモ",
    date: "日付",
  },

  transaction: {
    title: "支出履歴",
    empty: "支出がありません",
  },

  profile: {
    title: "プロフィール",
    logout: "ログアウト",
    changePassword: "パスワード変更",
  },

  main: {
    // ヘッダー
    greeting: "Hi !",

    // 支出サマリー
    monthlyExpenseTitle: "今月の支出額",

    // カテゴリー
    categories: {
    food: '食費',
    cafe: 'カフェ',
    transport: '交通',
    shopping: '買い物',
    rent: '家賃',
    medicine: '医薬品',
    hobby: '趣味',
    other: 'その他',
    },

    // 支出グラフ
    weeklyExpenseGraphTitle: "の支出グラフ",
    weeklyExpenseGraphEmpty: "支出データがありません",

    // 今日の支出
    todayExpenseTitle: "今日の支出",
    viewAll: "全て見る ›",
    todayExpenseEmpty: "今日の支出はありません！",

    // ローディング・エラー
    loading: "読み込み中...",
    error: "エラーが発生しました",
  },

  enterDirectly: {
    title: "手動入力",
    complete: "完了",

    amountLabel: "金額",
    amountEditHint: "タップして編集",

    shopLabel: "店名",
    shopPlaceholder: "スターバックス",

    memoLabel: "メモ（任意）",
    memoPlaceholder: "ホワイトモカアーモンドミルク変更オーダー ☕",

    dateLabel: "日付（タップして編集）",
    categoryTitle: "カテゴリを選ぶ",

    dateChoice: "日付を選択",

    categories: {
      food: "食費",
      cafe: "カフェ",
      transport: "交通",
      shopping: "買い物",
      rent: "家賃",
      medicine: "医薬品",
      hobby: "趣味",
      other: "その他",
    },

    receiptCapture: "レシート撮影",
    selectPhoto: "写真を選択",

    receiptNotice:
      "読み取り結果は正確でない場合があります。\n保存前に内容をご確認ください。",

    requiredFieldsError: "全ての項目を入力してください",
    saveSuccess: "支出を追加しました！",
    saveFailure: "支出の追加に失敗しました。",
    saveError: "保存に失敗しました",

    ocrLoadingTitle: "レシートを解析中...",
    ocrLoadingWait: "少々お待ちください。",
    ocrAccuracyNotice:
      "認識結果が正確でない場合があります。\n内容をご確認ください。",
  },

  transactions: {
    title: "全履歴",
    all: "すべて",
    today: "今日",
    yesterday: "昨日",
    loading: "読み込み中...",
    error: "エラーが発生しました",

    categories: {
      all: "すべて",
      food: "食費",
      cafe: "カフェ",
      transportation: "交通",
      shopping: "買い物",
      medicine: "医薬品",
      rent: "家賃",
      hobby: "趣味",
      other: "その他",
    },
  },

  transactionDetail: {
    title: "支出詳細",
    complete: "完了",
    detailHistory: "詳細履歴",

    shopName: "店名",
    category: "カテゴリー",
    date: "日付",
    memo: "メモ",

    editButton: "✏️ 修正",
    deleteButton: "🗑 削除",

    deleteConfirmTitle: "支出を削除しますか？",
    deleteConfirmMessage: "削除した支出は元に戻せません",

    cancel: "キャンセル",
    delete: "削除する",

    deleteSuccess: "削除が完了しました。",
    updateSuccess: "支出を更新しました。",
    error: "エラーが発生しました",
    loading: "読み込み中...",
    loadError: "エラーが発生しました。",
    notFound: "支出情報が見つかりません。",
  },

  editModal: {
    title: "支出修正",
    save: "保存",
    shopName: "店名",
    amount: "金額",
    amountPlaceholder: "0",
    memoLabel: "メモ（任意）",
    memoPlaceholder: "メモを入力してください",
    date: "日付",
    dateEditHint: "日付 (タップして編集)",
    saveButton: "保存する",
    requiredFieldsError: "内容を入力してください",
  },

  notificationPage: {
    title: "お知らせ",
    loading: "読み込み中...",
    error: "エラーが発生しました。",
    new: "NEW",
    emptyTitle: "お知らせはありません",
    emptyMessage: "新しいお知らせが届くとここに表示されます",

    budgetExceeded: {
    title: "予算超過のお知らせ",
    message: "今月の予算を超過しました。 \n 使いすぎには注意しましょう！",
    },
  },

  myPage: {
    loading: "読み込み中...",
    error: "エラーが発生しました。",
    userNotFound: "ユーザー情報が見つかりません。",
    budgetSettings: "予算設定",
    accountSettings: "アカウント設定",
    title: "マイページ",
    profileMessage: "今日もコツコツ節約中 🍑",
    monthlyCount: "今月の件数",
    currency: "¥",
    monthlyBudget: "今月の予算",
    totalExpenseCount: "累計記録数",
    signOut: "サインアウト",
    signOutConfirmTitle: "サインアウト",
    signOutConfirmMessage: "本当にサインアウトしますか？",
    cancel: "キャンセル",
  },

  budgetUpdatePage: {
    loading: "読み込み中...",
    error: "エラーが発生しました。",
    userNotFound: "ユーザー情報が見つかりません。",
    title: "予算設定",
    pageTitle: "月間予算を変更",
    pageDescription: "新しい月間予算を入力してください",
    budgetLabel: "月間予算",
    budgetPlaceholder: "月間予算を入力してください",
    currentBudget: "現在の月間予算",
    updateButton: "変更する",
    updateSuccess: "予算を変更しました！",
    updateFailure: "予算の変更に失敗しました",
    requiredError: "予算を入力してください",
    minimumError: "予算は1円以上で入力してください",
    info: "※ 月間予算は後からいつでも変更できます",
  },

  accountSettingsPage: {
    loading: "読み込み中...",
    error: "エラーが発生しました。",
    title: "アカウント設定",
    profileMessage: "ちょっと変えてみる？ ✨",
    profile: "プロフィール",
    username: "ユーザー名",
    loginId: "ログインID",
    security: "セキュリティ",
    changePassword: "パスワード変更",
    passwordChangeTitle: "パスワード変更",
    passwordChangeDescriptions:
      "すべての項目を入力してください",
    passwordChangeDescription:
      "現在のパスワードと新しいパスワードを入力してください",
    passwordChangeInputPlaceholder1: "現在のパスワード",
    passwordChangeInputPlaceholder2: "新しいパスワード",
    passwordChangeInputPlaceholder3: "新しいパスワード（確認）",
    passwordChangeCondition: "パスワードは8文字以上で入力してください",
    passwordChangeDiscrepancy: "入力したパスワードが一致しません",
    currentPasswordIncorrect: "現在のパスワードが正しくありません",
    passwordChangeonSuccess: "パスワードを変更しました !",
    passwordChangeonError: "パスワードの変更に失敗しました",
    passwordChangeCancel: "キャンセル",
    passwordChangeSave: "保存する",
    account: "アカウント",
    deleteAccount: "アカウント削除",
    deleteAccountTitle: "アカウント削除",
    deleteAccountMessage:
      "アカウントを削除すると、\nすべてのデータが削除されます。\n 本当に削除しますか？",
    deleteButton: "削除する",
    cancel: "キャンセル",
    changeUsernameTitle: "ユーザー名を変更",
    changeUsernameTitlesub: "新しいユーザー名を入力してください",
    usernamePlaceholder: "ユーザー名",
    usernameRequired: "ユーザー名を入力してください",
    usernameUpdateSuccess: "ユーザー名を変更しました！",
    usernameUpdateFailure: "ユーザー名の変更に失敗しました",
    profileImageUpdateSuccess: "プロフィール画像を変更しました！",
    profileImageUpdateFailure: "プロフィール画像の変更に失敗しました。",
    deleteAccountSuccess: "アカウントを削除しました...",
    deleteAccountFailure: "アカウントの削除に失敗しました",
  },

  calendarPage: {
    loading: "読み込み中...",
    error: "エラーが発生しました。",
    userNotFound: "ユーザー情報が見つかりません。",
    title: "カレンダー",
    budget: "予算",
    remainingBudget: "残額",
    selectedDateExpenses1: "月の総支出",
    selectedDateExpenses2: "日の支出",
    selectedDateExpenses3: "月",
    viewAll: "全て見る",
    noExpenses: "この日の支出はありません！",
  },

  graphPage: {
    title: "グラフ",
    weekly: "週間",
    monthly: "月間",
    yearly: "年間",
    thisWeek: "今週",
    thisMonth: "今月",
    thisYear: "今年",
    expenseGraphTitle: "の支出グラフ",
    categoryExpenseTitle: "のカテゴリ別支出",
    topExpenseTitle: "支出が多い！TOP 3",
    loading: "読み込み中...",
    error: "エラーが発生しました",
    noExpenseData: "支出データがありません",
  },


    privacyPolicy: {
    title: "MOMO 個人情報保護方針",
    effectiveDate: "施行日：2026年10月31日",

    introduction:
      "MOMO（以下「本サービス」）は、利用者の個人情報を大切にし、関連法令に従って適切に取り扱い、保護するよう努めます。",

            labels: {
      data: "取得項目：",
      purpose: "利用目的：",
      },
    sections: {

      operator: {
        title: "1. 個人情報取扱事業者に関する情報",
        content: [
          "サービス名：MOMO",
          "運営者：キム・ミンス",
          "個人情報保護責任者：キム・ミンス",
          "お問い合わせ先：qlrap24@gmail.com",
          "MOMOは個人によって運営されており、事業者登録は行っていません。",
        ],
      },

      collection: {
        title: "2. 取得する個人情報の項目および利用目的",
        description: "本サービスでは、以下の個人情報を取得・利用します。",
        items: [
          {
            category: "会員情報",
            data: "ログインID、ユーザー名、パスワード",
            purpose: "会員登録、ログインおよび会員管理",
          },
          {
            category: "プロフィール情報",
            data: "プロフィール画像",
            purpose: "ユーザープロフィールの提供",
          },
          {
            category: "支出情報",
            data: "支出のタイトル、金額、カテゴリー、メモ、支出日",
            purpose: "支出の記録および統計・グラフの提供",
          },
          {
            category: "通知情報",
            data: "通知のタイトルおよびメッセージ",
            purpose: "サービス利用に関する通知の提供",
          },
          {
            category: "サービス利用記録",
            data: "IPアドレス、アクセス日時、リクエストパス、リクエスト方法、レスポンスステータスなど",
            purpose: "サービスの運営、エラー確認およびセキュリティ管理",
          },
        ],
      },

      retention: {
        title: "3. 個人情報の保有および利用期間",
        content: [
          "会員情報、プロフィール画像、支出情報および通知情報は、アカウントの削除時に削除します。",
          "サービスの運営およびセキュリティ管理のために自動生成されるアクセスログは、運営、エラー確認およびセキュリティ管理に必要な範囲で保管し、保管目的を達成した後に削除します。現在、日数単位で定めた固定の保管期間はありません。",
          "関連法令により個人情報の保存が必要な場合は、当該法令で定められた期間、保管します。",
        ],
      },

      thirdParty: {
        title: "4. 個人情報の第三者提供",
        content: [
          "MOMOは、利用者の個人情報を原則として第三者に提供しません。",
          "ただし、法令に基づく場合、または捜査機関などの関係機関から適法な要請があった場合は、関連法令に従って提供することがあります。",
        ],
      },

      outsourcing: {
        title: "5. 個人情報の取扱いの委託およびインフラの利用",
        description:
          "MOMOは、サービスの運営のためにAmazon Web Services（AWS）のEC2クラウドサーバーを利用しています。",
        content: [
          "サービス提供者：Amazon Web Services（AWS）",
          "利用サービス：Amazon EC2",
          "利用目的：サービスサーバーおよびデータベースの運営",
          "データ保存リージョン：アジアパシフィック（ソウル、ap-northeast-2）",
          "会員情報、支出情報、通知情報およびプロフィール画像は、当該サーバーのデータベースおよびストレージを通じて管理されます。",
        ],
      },

      destruction: {
        title: "6. 個人情報の削除手続きおよび方法",
        content: [
          "利用目的を達成した場合、または利用者が退会した場合、該当する個人情報を遅滞なく削除します。",
          "データベースに保存された会員情報および当該会員に関連する支出情報・通知情報は、退会処理の際に削除します。",
          "利用者がアップロードしたプロフィール画像は、退会時に削除します。ただし、サービス共通のデフォルトプロフィール画像は削除対象外です。",
          "電子ファイル形式の個人情報は、復元できない方法で削除します。",
        ],
      },

      security: {
        title: "7. 個人情報の安全管理措置",
        content: [
          "会員認証およびアクセス権限の管理",
          "JWT認証によるAPIアクセス制御",
          "HTTPSによる通信の保護",
          "サーバーおよびデータベースへのアクセス管理",
          "サービス運営ログによるエラーおよびセキュリティ上の問題の確認",
        ],
      },

      ocr: {
        title: "8. OCR機能およびレシート画像の取扱い",
        content: [
          "MOMOは、レシートの内容を読み取るためにTesseract.jsを利用したOCR機能を提供しています。",
          "OCR処理は利用者の端末内で行われ、OCR処理のためにレシート画像そのものがMOMOのサーバーへ送信されることはありません。",
          "利用者がOCRの認識結果を確認し、支出情報として保存することを選択した場合、保存対象として選択された支出情報はサービスサーバーへ送信され、保管されます。",
        ],
      },

      analytics: {
        title: "9. 外部分析サービスおよび広告サービス",
        content: [
          "MOMOは現在、外部の広告トラッキングサービスや分析サービスを利用していません。",
          "サービス内で提供する支出統計およびグラフは、利用者が保存した支出情報に基づいて提供されます。",
        ],
      },

      rights: {
        title: "10. 利用者の権利およびその行使方法",
        content: [
          "自身の個人情報の開示請求",
          "個人情報の訂正および削除の請求",
          "個人情報の取扱いの停止請求",
          "退会およびアカウントの削除",
          "退会はサービス内から直接行うことができます。その他の個人情報に関するお問い合わせは、メールにてご連絡ください。",
        ],
      },

      contact: {
        title: "11. 個人情報保護責任者およびお問い合わせ先",
        content: [
          "個人情報保護責任者：キム・ミンス",
          "メールアドレス：qlrap24@gmail.com",
          "個人情報の取扱いに関するお問い合わせ、苦情および相談は、上記メールアドレスにて受け付けています。",
        ],
      },

      changes: {
        title: "12. 個人情報保護方針の変更",
        content: [
          "本方針の内容を変更する場合は、サービス内での告知または適切な方法により利用者にお知らせします。",
        ],
      },
    },
  },
};

export default ja;
