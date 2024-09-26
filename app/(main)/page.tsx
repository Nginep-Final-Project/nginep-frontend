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

  const handleViewMore = () => {
    if (data) {
      refetch({ page: (data.pageable.pageNumber || 0) + 1 }, true)
    }
  }

  if (error || ErrorViewMore) {
    return <Error />
  }

  {
    console.log(data)
  }
  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='p-4 w-full'>
          <AlertHandler />
        </div>
        <Hero />
        <FilterSort categories={result.categories} cities={result.cities} />
        <PropertyListCard
          properties={
            data.content.length === 0 ? result.properties.content : data.content
          }
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
      {loading && <Loading />}
    </>
  )
}
export default Home
