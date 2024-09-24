import Image from 'next/image'
import LoadingGif from '@/public/loading.webp'

const Error = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center space-y-4'>
      <Image
        src={LoadingGif}
        width={300}
        height={300}
        priority={true}
        style={{ height: 'auto', width: 'auto' }}
        alt='loading-gif'
        className='h-[300px] w-[300px] object-contain'
      />
      <p className='lg:text-3xl'>Something went wrong. Please refresh</p>
    </div>
  )
}
export default Error
