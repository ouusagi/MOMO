// e-mail形式の検証
export const isValidEmail = (loginID:string):boolean =>  {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(loginID)
}

// パスワード 文字数検証
export const isValidPassword = (password:string):boolean => {
    return password.length >= 8
}

// ユーザー名 文字数制限
export const isValidUserName = (username:string):boolean => {
    return username.length <= 10
}