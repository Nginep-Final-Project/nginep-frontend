import React from 'react'

const RenderField: React.FC<{
  label: string
  error?: string
  render: React.ReactNode
}> = ({ render, label, error }) => {
  return (
    <div className='mb-4 flex flex-col'>
      {label && <label className='text-sm font-medium mb-1'>{label}</label>}
      {render}
      {error && <p className='mt-2 text-sm text-error'>{error}</p>}
    </div>
  )
}

export default RenderField
