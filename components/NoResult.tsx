import Image from 'next/image'
import Empty from '@/public/no-result.gif'
import React from 'react'

const NoResult: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className='p-4 flex flex-col items-center justify-center text-center gap-y-4 font-semibold'>
      <Image
        src={Empty}
        width={150}
        height={150}
        priority={true}
        style={{ height: 'auto', width: 'auto' }}
        alt='no-result-gif'
        className='h-[150px] w-[150px] object-contain'
      />
      {message}
    </div>
  )
}
export default NoResult
