import { Star } from 'lucide-react'

interface HotelHeaderProps {
  name: string
  rating: number
  reviewCount: number
  location: string
}
const Header: React.FC<HotelHeaderProps> = ({
  name,
  rating,
  reviewCount,
  location,
}) => {
  return (
    <div className='p-4 lg:px-32'>
      <h1 className='text-2xl font-bold mb-2'>{name}</h1>
      <div className='flex items-center space-x-3 text-sm flex-wrap'>
        <div className='flex items-center'>
          <Star className='w-4 h-4 mr-1' fill='currentColor' />
          <span className='font-semibold'>{rating.toFixed(1)}</span>
        </div>
        <span className='text-grey-text'>·</span>
        <span>{reviewCount.toLocaleString()} reviews</span>

        <span className='text-grey-text'>·</span>
        <span>{location}</span>
      </div>
    </div>
  )
}
export default Header
