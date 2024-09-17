import LoadingGif from '@/public/loading.webp'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 w-full min-h-screen flex flex-col items-center justify-center space-y-4'>
      <Image
        src={LoadingGif}
        width={300}
        height={300}
        style={{ height: '300px', width: '300px' }}
        alt='loading-gif'
        className=' object-contain'
      />
      <p className='text-white lg:text-3xl'>Loading....</p>
    </div>
  )
}
export default Loading
