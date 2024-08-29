import React, { useState } from 'react'
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Path,
} from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  label: string
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'file'
    | 'checkbox'
    | 'textarea'
    | 'date'
  register: UseFormRegister<TFieldValues>
  errors: FieldErrors<TFieldValues>
  options?: { value: string; label: string }[]
}

const Input = <TFieldValues extends FieldValues>({
  name,
  label,
  type,
  register,
  errors,
  options,
}: InputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false)

  const renderInput = () => {
    switch (type) {
      case 'checkbox':
        return (
          <input
            type='checkbox'
            {...register(name)}
            className='rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />
        )
      case 'textarea':
        return (
          <textarea
            {...register(name, { required: true })}
            className='mt-1 block w-full rounded-md border border-secondary focus:outline-none p-2'
          />
        )
      case 'password':
        return (
          <div className='p-2 mt-1 rounded-md border border-secondary flex items-center'>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register(name, { required: true })}
              className=' focus:outline-none w-full'
            />
            {showPassword ? (
              <EyeOff onClick={() => setShowPassword(false)} />
            ) : (
              <Eye onClick={() => setShowPassword(true)} />
            )}
          </div>
        )
      default:
        return (
          <input
            type={type}
            {...register(name, { required: true })}
            className='mt-1 block w-full rounded-md border border-secondary focus:outline-none p-2'
          />
        )
    }
  }

  return (
    <div className='mb-4'>
      <label htmlFor={name} className='block text-sm font-medium'>
        {label}
      </label>
      {renderInput()}
      {errors[name] && (
        <p className='mt-2 text-sm text-error'>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  )
}

export default Input
