import React from 'react'

interface InputProps {
    type?: 'text' | 'password' | 'email' | 'number'
    placeholder?: string
    value: string | number
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void
    label?: string
    error?: string
    className?: string
}

const Input = ({ type, placeholder, value, onChange, label, error, className }:InputProps)=>{

    const baseStyle = 'rounded-xl outline-none border-none py-4 px-3 bg-[#FFFFFF] bg-opacity-75 caret-[#F47560] text-[#3D2C2C]'
    return(
        <div className='flex flex-col gap-1'>
            {label && <label className='text-[#7A5555] font-bold'>{label}</label>}
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={`${baseStyle} ${className}`} />
            {error && <span className='text-red-500 text-sm'>{error}</span>}
        </div>
    )
}




export default Input