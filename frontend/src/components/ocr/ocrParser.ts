type OCRParsedResult = {
    title: string
    amount: string
    date: Date | null
}

export const parseReceiptText = (text: string): OCRParsedResult => {

    const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)

    // 1. 날짜 추출
    let date: Date | null = null

    const japaneseDateRegex =
        /(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/

    const numericDateRegex =
        /(\d{4})[./-]\s*(\d{1,2})[./-]\s*(\d{1,2})/

    for (const line of lines) {
        const match =
            line.match(japaneseDateRegex) ??
            line.match(numericDateRegex)

        if (match) {
            const year = Number(match[1])
            const month = Number(match[2])
            const day = Number(match[3])

            const parsedDate = new Date(year, month - 1, day)

            if (
                parsedDate.getFullYear() === year &&
                parsedDate.getMonth() === month - 1 &&
                parsedDate.getDate() === day
            ) {
                date = parsedDate
                break
            }
        }
    }

    // 2. 가격 추출
    let amount = ''

    const totalKeywords = /합\s*계|총\s*액|결제\s*금액|받을\s*금액|합계금액|合\s*計|総\s*計|お会計|ご請求|小\s*計/
    const excludedTotalKeywords = /내역|부가세|부가가치세|세액|과세|면세|받은\s*금액|거스름돈|내\s*세|内\s*税|内消費税|消費税|税額|お預かり|お釣り|釣銭/

    for (const line of lines) {
        if (!totalKeywords.test(line) || excludedTotalKeywords.test(line)) 
            {
            continue
        }

        const keywordMatch = line.match(/(?:결제\s*금액|받을\s*금액|합계금액|합\s*계|총\s*액|お会計|ご請求|合\s*計|総\s*計|小\s*計)(.*)/)

        if (!keywordMatch) continue

        const numberMatch = keywordMatch[1].match(/[¥￥\\]?\s*([\d]+(?:[,，.]\s*[\d]+)*)/)

        if (!numberMatch) continue

        const digits = numberMatch[1].replace(/\D/g, '')

        if (digits) {
            amount = digits
            break
        }
    }

    // 3. 가게명 후보 추출
    const title = lines.find((line) => {
        if (line.length < 2) return false

        if (/年.*月.*日|電話|TEL|〒|https?:|合\s*計|総\s*計|小\s*計|内\s*税|消費税|お預かり|お釣り|点数|人数|No\.|합\s*계|총\s*액|결제\s*금액|받을\s*금액|부가세|부가가치세|사업자등록번호|대표자|전화번호|거스름돈/i.test(line)) 
        {
            return false
        } 

        // 전화번호처럼 숫자가 많은 줄 제외
        const digits = line.replace(/\D/g, '')
        if (digits.length >= 7) return false

        // 주소 후보 제외
        if (/\d+\s*[-丁目番地]/.test(line)) return false

        return true
    }) ?? ''

    return {
        title,
        amount,
        date,
    }
}