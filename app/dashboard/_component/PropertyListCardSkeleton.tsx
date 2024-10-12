import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const PropertyListCardSkeleton: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className='p-8 flex flex-col items-center'>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            className='flex flex-col-reverse md:flex-row border border-secondary rounded-lg p-4 mb-4 w-full h-56 justify-between'
          >
            <CardContent className='md:w-2/3 flex flex-col justify-between p-0'>
              <div>
                <Skeleton className='h-6 w-3/4 mb-2 bg-gray-200' />
                <Skeleton className='h-4 w-1/2 mb-4 bg-gray-200' />
                <Skeleton className='h-4 w-1/4 mb-2 bg-gray-200' />
                <div className='flex space-x-2 mb-4 bg-gray-200'>
                  <Skeleton className='h-4 w-16 bg-gray-200' />
                  <Skeleton className='h-4 w-16 bg-gray-200' />
                  <Skeleton className='h-4 w-16 bg-gray-200' />
                </div>
              </div>
              <div className='flex space-x-4'>
                <Skeleton className='h-10 w-24 bg-gray-200' />
                <Skeleton className='h-10 w-24 bg-gray-200' />
              </div>
            </CardContent>
            <div className='md:w-1/3 flex justify-end'>
              <Skeleton className='h-[200px] w-[200px] rounded-md bg-gray-200' />
            </div>
          </Card>
        ))}
    </div>
  )
}
export default PropertyListCardSkeleton
