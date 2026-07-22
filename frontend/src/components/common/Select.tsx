import React from 'react'

interface SelectProps {
    label?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: { value: string, label: string }[]
    className?: string
}

const Select = ({ label, value, onChange, options, className }: SelectProps) => {

    const baseStyle = 'rounded-xl outline-none border-none py-4 px-3 bg-[#FFFFFF] bg-opacity-75 text-[#3D2C2C] w-full appearance-none cursor-pointer'

    return (
        <div className='flex flex-col gap-1'>
            {label && <label className='text-[#7A5555] font-bold'>{label}</label>}
            <div className='relative'>
                <select
                    value={value}
                    onChange={onChange}
                    className={`${baseStyle} ${className}`}
                    disabled={true}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className='absolute right-3 top-1/2 -translate-y-1/2 text-[#B89090] pointer-events-none'>›</span>
            </div>
        </div>
    )
}

export default Select