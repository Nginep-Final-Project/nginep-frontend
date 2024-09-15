import LoadingGif from '@/public/loading-gif.gif'
import Image from 'next/image'

const loading = () => {
  return (
    <Image
      src={LoadingGif}
      width={150}
      height={150}
      style={{ height: 'auto', width: 'auto' }}
      alt='loading-gif'
    />
  )
}
export default loading
