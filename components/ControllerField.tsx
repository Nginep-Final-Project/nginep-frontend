import React from 'react'
import { Control, Controller } from 'react-hook-form'

interface ControllerFieldProps {
  name: string
  control: Control<any>
  label: string
  error?: string
  render: (field: any) => React.ReactNode
}

const ControllerField: React.FC<ControllerFieldProps> = ({
  name,
  control,
  label,
  error,
  render,
}) => {
  return (
    <Controller
      name='propertyCategory'
      control={control}
      render={({ field }) => (
        <div className='mb-4 flex flex-col'>
          {label && <label className='text-sm font-medium mb-1'>{label}</label>}
          {render(field)}
          {error && <p className='mt-2 text-sm text-error'>{error}</p>}
        </div>
      )}
    />
  )
}
export default ControllerField
