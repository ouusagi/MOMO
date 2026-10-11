import { createWorker } from 'tesseract.js'

const preprocessImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const url = URL.createObjectURL(file)

        img.onload = () => {
            // 이미지 크기를 2배로 확대
            const scale = 2

            const canvas = document.createElement('canvas')
            canvas.width = img.width * scale
            canvas.height = img.height * scale

            const ctx = canvas.getContext('2d')

            if (!ctx) {
                reject(new Error('Canvas를 생성할 수 없습니다.'))
                return
            }

            // 이미지 확대
            ctx.drawImage(
                img,
                0,
                0,
                canvas.width,
                canvas.height
            )

            // 이미지 픽셀 데이터 가져오기
            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            )

            const data = imageData.data

            // 흑백 + 대비 조절
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i]
                const g = data[i + 1]
                const b = data[i + 2]

                // 흑백 변환
                const gray = 0.299 * r + 0.587 * g + 0.114 * b

                // 대비 증가
                const contrast = 1.5
                const value = (gray - 128) * contrast + 128

                const result = Math.max(0, Math.min(255, value))

                data[i] = result
                data[i + 1] = result
                data[i + 2] = result
            }

            ctx.putImageData(imageData, 0, 0)

            canvas.toBlob(
                (blob) => {
                    URL.revokeObjectURL(url)

                    if (blob) {
                        resolve(blob)
                    } else {
                        reject(new Error('이미지 변환에 실패했습니다.'))
                    }
                },
                'image/png'
            )
        }

        img.onerror = () => {
            URL.revokeObjectURL(url)
            reject(new Error('이미지를 불러올 수 없습니다.'))
        }

        img.src = url
    })
}

export const runOCR = async (file: File): Promise<string> => {
    // OCR 전에 이미지 전처리
    const processedImage = await preprocessImage(file)

    const worker = await createWorker(['kor', 'jpn', 'eng'])

    try {
        const { data } = await worker.recognize(processedImage)
        return data.text
    } 
    finally {
        await worker.terminate()
    }
}