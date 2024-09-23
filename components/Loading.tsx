import LoadingGif from '@/public/loading.webp'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 w-full min-h-screen flex flex-col items-center justify-center space-y-4'>
      <Image
        src={LoadingGif}
        width={300}
        height={300}
        priority={true}
        style={{ height: 'auto', width: 'auto' }}
        alt='loading-gif'
        className='h-[300px] w-[300px] object-contain'
      />
      <p className='text-white lg:text-3xl'>Loading....</p>
    </div>
  )
}
export default Loading
