'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

interface TenantProfileProps {
  name: string
  pictureProfile: string
  joinDate: string
  rating: number
  reviewCount: number
  isSuperhost: boolean
  isIdentityVerified: boolean
  languages: string[]
  responseRate: number
  responseTime: string
  description: string
  stayInfo: string
}

const TenantProfile: React.FC<TenantProfileProps> = ({
  name,
  pictureProfile,
  joinDate,
  rating,
  reviewCount,
  isSuperhost,
  isIdentityVerified,
  languages,
  responseRate,
  responseTime,
  description,
  stayInfo,
}) => {
  return (
    <div className='p-4 lg:px-32 md:pb-32'>
      <div className='flex items-center mb-4'>
        <Avatar className='w-16 h-16 mr-4'>
          <AvatarImage src={pictureProfile} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className='text-xl font-semibold'>Hosted by {name}</h2>
          <p className='text-sm text-grey-text'>Joined in {joinDate}</p>
        </div>
      </div>

      <div className='flex items-center space-x-2 mb-4'>
        <Star className='w-4 h-4' />
        <span>
          {rating} · {reviewCount} reviews
        </span>
        {isSuperhost && (
          <span className='text-sm bg-secondary px-2 py-1 rounded'>
            Superhost
          </span>
        )}
      </div>

      <div className='grid md:grid-cols-2 md:gap-36'>
        <div>
          <p className='mb-4'>{description}</p>

          <div className='mb-4'>
            <h3 className='font-semibold mb-2'>During your stay</h3>
            <p>{stayInfo}</p>
          </div>

          {isSuperhost && (
            <div className='mb-4'>
              <h3 className='font-semibold mb-2'>{name} is a Superhost</h3>
              <p className='text-sm text-gray-600'>
                Superhosts are experienced, highly rated hosts who are committed
                to providing great stays for guests.
              </p>
            </div>
          )}
        </div>
        <div>
          <div className='mb-4'>
            <p className='mb-2'>Languages: {languages.join(', ')}</p>
            <p className='mb-2'>Response rate: {responseRate}%</p>
            <p>Response time: {responseTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TenantProfile
