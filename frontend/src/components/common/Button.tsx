import React from 'react'

interface ButtonProps {
    variant?: 'primary' | 'outline' | 'back'
    onClick?: () => void                        
    children: React.ReactNode                   
    disabled?: boolean                         
    fullWidth?: boolean 
    type?: 'button' | 'submit' | 'reset'
    className: string
}

const Button = ({ variant = 'primary', onClick, children, disabled = false, fullWidth = false, type = 'button', className = ''}:ButtonProps)=>{

    const baseStyle = 'rounded-xl font-semibold transition-all duration-200 active:scale-95'
    const variants = {
        primary: 'bg-[#F47560] text-white py-4 px-6 text-base shadow-md',
        outline: 'bg-white text-[#F47560] py-4 px-6 text-base',
        back: 'bg-[rgba(255,255,255,0.55)] text-gray-500 w-10 h-10 flex items-center justify-center'
    }
    const widthStyle = fullWidth ? 'w-full' : ''
    const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

    return(
        <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${widthStyle} ${disabledStyle} ${className}`}>
            {children}
        </button>
    )
}

export default Button