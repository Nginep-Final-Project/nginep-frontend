'use client'
import Hero from './_components/Hero'
import PropertyListCard from './_components/PropertyListCard'
import { propertyList } from '@/utils/dummy'
import { Button } from '@/components/ui/button'
import FilterSort from './_components/FilterSort'
import useHome from '@/hooks/useHome'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import AlertHandler from '@/components/AlertHandler'
import useSearchProperty from '@/hooks/useSearchProperty'
import { useSearchParams } from 'next/navigation'

export interface FilterRequest {
  name: string
  category: string
  city: string
  checkInDate: string
  checkoutDate: string
  totalGuests: number
  sortBy: string
  sortDirection: string
}

const initialParams = {
  page: 0,
  size: 12,
}

const Home = () => {
  const { result, loading, error } = useHome()
  const {
    data,
    loading: loadingViewMore,
    error: ErrorViewMore,
    refetch,
  } = useSearchProperty(initialParams)
  const searchParams = useSearchParams()
  const errorAuth = searchParams.get('error')

  const handleViewMore = () => {
    if (data) {
      refetch({ page: (data.pageable.pageNumber || 0) + 1 }, true)
    }
  }

  const handleFilter = (request: FilterRequest) => {
    if (data) {
      refetch({
        propertyName: request.name,
        propertyCategory: request.category,
        propertyCity: request.city,
        checkinDate: request.checkInDate,
        checkoutDate: request.checkoutDate,
        totalGuests: request.totalGuests,
        sortBy: request.sortBy,
        sortDirection: request.sortDirection,
        page: 0,
      })
    }
  }

  if (error || ErrorViewMore) {
    return <Error />
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        {errorAuth && (
          <div className='p-4 w-full'>
            <AlertHandler />
          </div>
        )}

        <Hero />
        <FilterSort
          onFilter={handleFilter}
          categories={result.categories}
          cities={result.cities}
        />
        <PropertyListCard
          properties={data.content}
          loading={loading || loadingViewMore}
        />

        {data.last === false && (
          <Button
            className='bg-black text-white rounded-3xl mt-4 mb-16 md:mt-8 lg:mb-36'
            onClick={handleViewMore}
            disabled={loadingViewMore}
          >
            {loadingViewMore ? 'Loading...' : 'Show more'}
          </Button>
        )}
      </div>
      {loading || (loadingViewMore && <Loading />)}
    </>
  )
}
export default Home
