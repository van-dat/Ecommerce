import React from 'react'
import clsx from 'clsx'
const InputForm = ({label, disable, placeholder, type = 'text', validate, id ,errors, register, defaultValue , fullWidth, style }) => {
    return (
        <div className={clsx('flex flex-col items-center ', label && 'gap-2 ', fullWidth && 'w-full')}>
           {label && <label htmlFor={id} className='text-start w-full'>{label}</label>}
           <input 
           type={type} 
           id={id} 
           {...register(id, validate)}
           disable = {disable}
           placeholder = {placeholder}
           className = {clsx('form-input', fullWidth && 'w-full' , 'rounded-md h-[40px]', style)}
           defaultValue={defaultValue}
           />
           {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
           
        </div>

    )
}

export default InputForm
