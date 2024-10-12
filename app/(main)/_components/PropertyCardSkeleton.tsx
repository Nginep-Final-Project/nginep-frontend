import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const PropertyCardSkeleton: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className='grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-11'>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Card key={index} className='w-full max-w-sm'>
            <CardContent className='p-0'>
              <Skeleton className='w-full h-80 bg-gray-200' />
              <div className='p-4 space-y-3'>
                <Skeleton className='h-4 w-[200px] bg-gray-200' />
                <div className='flex justify-between items-center'>
                  <Skeleton className='h-4 w-[200px] bg-gray-200' />
                  <Skeleton className='h-4 w-[32px] bg-gray-200' />
                </div>
                <Skeleton className='h-4 w-[200px] bg-gray-200' />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
export default PropertyCardSkeleton
