import React from 'react'
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Path,
} from 'react-hook-form'

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
    | 'select'
    | 'textarea'
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
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            {...register(name, { required: true })}
            className='mt-1 block w-full rounded-md border border-secondary focus:outline-none p-2'
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
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
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
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
