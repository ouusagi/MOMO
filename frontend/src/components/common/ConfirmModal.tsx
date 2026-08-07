import { useEffect, useState } from 'react'
import Button from './Button'

interface ConfirmModalProps {
    isOpen: boolean
    title: string
    message: string
    onConfirm?: () => void
    onCancel: () => void
    confirmText?: string
    cancelText?: string
}

const ConfirmModal = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = '削除する',
    cancelText = 'キャンセル'
}: ConfirmModalProps) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShow(true), 10)
        } else {
            setShow(false)
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex items-end justify-center z-50'>
            
            {/* background modal close */}
            <div className='absolute inset-0' onClick={onCancel} />

            {/* Animation effects */}
            <div className={`relative bg-white rounded-t-3xl p-6 w-full flex flex-col items-center gap-4 shadow-lg transition-transform duration-300 ${show ? 'translate-y-0' : 'translate-y-full'}`}>

                {/* emoji */}
                <div className='w-16 h-16 bg-[#FFE8E0] rounded-full flex items-center justify-center text-3xl'>🗑️</div>

                {/* title */}
                <h2 className='text-[#3D2C2C] font-bold text-lg'>{title}</h2>

                {/* message */}
                <p className='text-[#B89090] text-sm text-center'>{message}</p>

                {/* button */}
                <div className='flex gap-3 w-full mt-2 pb-4'>
                    <Button variant='cancel' fullWidth onClick={onCancel}>{cancelText}</Button>
                    <Button variant='primary' fullWidth onClick={onConfirm}>{confirmText}</Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal