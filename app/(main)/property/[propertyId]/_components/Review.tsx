'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Star } from 'lucide-react'
import PropertyDialog from './PropertyDialog'
import { ReviewItem, ReviewSummary } from '@/types/property'
import moment from 'moment'

interface ReviewProps {
  reviewSummary: ReviewSummary
  reviewList: ReviewItem[]
}

interface RatingOutput {
  name: string
  score: number
}

const Review: React.FC<ReviewProps> = ({ reviewSummary, reviewList }) => {
  const convertRatings = (input: ReviewSummary): RatingOutput[] => {
    const nullToZero = (value: number | null): number =>
      value === null ? 0.0 : value

    return [
      { name: 'averageRating', score: input.averageRating },
      { name: 'totalReviews', score: input.totalReviews },
      { name: 'Cleanliness', score: nullToZero(input.cleanlinessRating) },
      { name: 'Accuracy', score: nullToZero(input.accuracyRating) },
      { name: 'Communication', score: nullToZero(input.communicationRating) },
      { name: 'Location', score: nullToZero(input.locationRating) },
      { name: 'Check-in', score: nullToZero(input.checkInRating) },
      { name: 'Value', score: nullToZero(input.valueRating) },
    ]
  }
  const categories = convertRatings(reviewSummary)

  return (
    <div className='w-full p-6 lg:px-32'>
      <div className='flex items-center mb-6'>
        <Star className='w-6 h-6 text-primary-text mr-2' />
        <span className='text-2xl font-bold mr-2'>
          {reviewSummary.averageRating}
        </span>
        <span className='text-grey-text'>
          • {reviewSummary.totalReviews} reviews
        </span>
      </div>

      <div className='grid grid-cols-2 gap-4 md:gap-x-10 mb-6'>
        {categories.slice(2, categories.length).map((category, index) => (
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

      <div className=' md:grid md:grid-cols-2 gap-4 md:gap-x-10 mb-4 pb-4 md:pb-14 border-b border-grey-text'>
        {reviewList.slice(0, 7).map((review, index) => (
          <div key={index} className='flex items-start'>
            <Avatar className='w-10 h-10 mr-3'>
              <AvatarImage src={review.userPicture} alt={review.fullName} />
              <AvatarFallback>{review.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className='flex-grow'>
              <div className='flex flex-col items-start mb-1'>
                <span className='font-semibold'>{review.fullName}</span>
                <span className='text-sm text-grey-text'>
                  {moment(review.createdAt).format('MMMM YYYY')}
                </span>
              </div>
              <p className='text-sm text-grey-text'>{review.comment}</p>
            </div>
          </div>
        ))}
        {reviewList.length > 7 && (
          <div className='flex justify-center'>
            <PropertyDialog
              itemName='reviews'
              content={
                <>
                  {reviewList.map((review, index) => (
                    <div key={index} className='flex items-start max-h-screen'>
                      <Avatar className='w-10 h-10 mr-3'>
                        <AvatarImage
                          src={review.userPicture}
                          alt={review.fullName}
                        />
                        <AvatarFallback>{review.fullName[0]}</AvatarFallback>
                      </Avatar>
                      <div className='flex-grow'>
                        <div className='flex flex-col items-start mb-1'>
                          <span className='font-semibold'>
                            {review.fullName}
                          </span>
                          <span className='text-sm text-grey-text'>
                            {moment(review.createdAt).format('MMMM YYYY')}
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
    </div>
  )
}
export default Review
