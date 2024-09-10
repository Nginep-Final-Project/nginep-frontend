'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { ChevronRight, Star } from 'lucide-react'
import PropertyDialog from './PropertyDialog'

interface Review {
  user: string
  date: string
  comment: string
  avatar: string
}

interface ReviewProps {
  rating: number
  totalReviews: number
  categories: { name: string; score: number }[]
  reviews: Review[]
}

const Review: React.FC<ReviewProps> = ({
  rating,
  totalReviews,
  categories,
  reviews,
}) => {
  return (
    <div className='w-full p-6 lg:px-32'>
      <div className='flex items-center mb-6'>
        <Star className='w-6 h-6 text-primary-text mr-2' />
        <span className='text-2xl font-bold mr-2'>{rating}</span>
        <span className='text-grey-text'>• {totalReviews} reviews</span>
      </div>

      <div className='grid grid-cols-2 gap-4 md:gap-x-10 mb-6'>
        {categories.map((category, index) => (
          <div key={index} className='grid md:grid-cols-2 items-center'>
            <div className='w-24 text-sm text-grey-text'>{category.name}</div>
            <div className='flex items-center'>
              <Progress value={category.score * 20} className='flex-grow h-2' />
              <span className='ml-2 text-sm text-grey-text'>
                {category.score.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='space-y-4 md:grid md:grid-cols-2 gap-4 md:gap-x-10 mb-4 pb-4 md:pb-14 border-b border-grey-text'>
        {reviews.slice(0, 7).map((review, index) => (
          <div key={index} className='flex items-start'>
            <Avatar className='w-10 h-10 mr-3'>
              <AvatarImage src={review.avatar} alt={review.user} />
              <AvatarFallback>{review.user[0]}</AvatarFallback>
            </Avatar>
            <div className='flex-grow'>
              <div className='flex justify-between items-center mb-1'>
                <span className='font-semibold'>{review.user}</span>
                <span className='text-sm text-grey-text'>{review.date}</span>
              </div>
              <p className='text-sm text-grey-text'>{review.comment}</p>
            </div>
          </div>
        ))}
        {reviews.length > 7 && (
          <div className='flex justify-center'>
            <PropertyDialog
              itemName='reviews'
              content={
                <>
                  {reviews.map((review, index) => (
                    <div key={index} className='flex items-start max-h-screen'>
                      <Avatar className='w-10 h-10 mr-3'>
                        <AvatarImage src={review.avatar} alt={review.user} />
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className='flex-grow'>
                        <div className='flex justify-between items-center mb-1'>
                          <span className='font-semibold'>{review.user}</span>
                          <span className='text-sm text-grey-text'>
                            {review.date}
                          </span>
                        </div>
                        <p className='text-sm text-grey-text'>
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              }
            />
          </div>
        )}
      </div>

      {/* <button className='mt-6 w-full py-2 bg-gray-100 text-grey-text rounded-lg flex items-center justify-center'>
        Show all {totalReviews} reviews
        <ChevronRight className='w-4 h-4 ml-2' />
      </button> */}
    </div>
  )
}
export default Review
