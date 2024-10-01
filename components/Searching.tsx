import Image from 'next/image'
import Search from '@/public/search.gif'

const Searching = () => {
  return (
    <div className='flex justify-center h-full w-full'>
      <Image
        src={Search}
        width={200}
        height={200}
        priority={true}
        style={{ height: '200px', width: '200px' }}
        alt='no-result-gif'
        className='h-[200px] w-[200px] object-cover'
      />
    </div>
  )
}
export default Searching
