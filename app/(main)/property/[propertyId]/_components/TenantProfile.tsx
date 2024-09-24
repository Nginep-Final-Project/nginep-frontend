'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ReviewSummary, Tenant } from '@/types/property'
import { Star } from 'lucide-react'
import moment from 'moment'

interface TenantProfileProps {
  tenant: Tenant
  rating: ReviewSummary
}

const TenantProfile: React.FC<TenantProfileProps> = ({ tenant, rating }) => {
  return (
    <div className='p-4 lg:px-32 md:pb-32'>
      <div className='flex items-start mb-4'>
        <Avatar className='w-16 h-16 flex items-start rounded-none'>
          <AvatarImage src={tenant.profilePicture} alt={tenant.fullName} />
          <AvatarFallback>{tenant.fullName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className='text-xl font-semibold'>Hosted by {tenant.fullName}</h2>
          <p className='text-sm text-grey-text'>
            Joined in {moment(tenant.createdAt).format('MMMM YYYY')}
          </p>
        </div>
      </div>

      <div className='flex items-center space-x-2 mb-4'>
        <Star className='w-4 h-4' />
        <span>
          {rating.averageRating} · {rating.totalReviews} reviews
        </span>
      </div>

      <div className='grid md:grid-cols-2 md:gap-36'>
        <div>
          <p className='mb-4 line-clamp-6'>{tenant.aboutYourself}</p>

          <div className='mb-4'>
            <h3 className='font-semibold mb-2'>During your stay</h3>
            <p>24/7 full management</p>
          </div>

          <div>
            <h3 className='font-semibold mb-2'>Cancellation policy</h3>
            <p className='line-clamp-6'>{tenant.cancelPolicy}</p>
          </div>
        </div>
        <div>
          <div className='mb-4'>
            <p className='mb-2'>
              Languages:{' '}
              {tenant.languages.map((e) => e.languageName).join(', ')}
            </p>
            <p className='mb-2'>
              Response rate: {(rating.communicationRating / 5) * 100}%
            </p>
            <p className='mb-2'>Check in time: {tenant.checkinTime}</p>
            <p className='mb-2'>Check out time: {tenant.checkoutTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TenantProfile
