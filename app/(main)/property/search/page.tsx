'use client'
import { useSearchParams } from 'next/navigation'
import FilterSort from '../../_components/FilterSort'
import PropertyListCard from '../../_components/PropertyListCard'
import { Button } from '@/components/ui/button'
import Loading from '@/components/Loading'
import useSearchProperty from '@/hooks/useSearchProperty'
import { FilterRequest } from '../../page'
import Error from '@/components/Error'
import { useEffect, useState } from 'react'
import { emptyPropertyData, PropertyData } from '@/types/property'
import { HOME } from '@/utils/constanta'

const initialParams = {
  page: 0,
  size: 12,
}

const Search = () => {
  const [homeData, setHomeData] = useState<PropertyData>(emptyPropertyData)
  const { data, loading, error, refetch } = useSearchProperty(initialParams)

  useEffect(() => {
    const storedData = sessionStorage.getItem(HOME)
    if (storedData) {
      const parseStoredData = JSON.parse(storedData)
      setHomeData(parseStoredData.data)
      return
    }
  }, [])

  const handleViewMore = () => {
    if (data) {
      refetch({ page: (data.pageable.pageNumber || 0) + 1 }, true)
    }
  }

  const handleFilter = (request: FilterRequest) => {
    if (data) {
      refetch(
        {
          propertyName: request.name,
          propertyCategory: request.category,
          propertyCity: request.city,
          checkinDate: request.checkInDate,
          checkoutDate: request.checkoutDate,
          totalGuests: request.totalGuests,
          sortBy: request.sortBy,
          sortDirection: request.sortDirection,
          page: 0,
        },
        true,
        true
      )
    }
  }

  if (error) {
    return <Error />
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <FilterSort
          onFilter={handleFilter}
          categories={homeData.categories}
          cities={homeData.cities}
        />
        <PropertyListCard properties={data.content} />

        {data.last === false && (
          <Button
            className='bg-black text-white rounded-3xl mt-4 mb-16 md:mt-8 lg:mb-36'
            onClick={handleViewMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show more'}
          </Button>
        )}
      </div>
      {loading && <Loading />}
    </>
  )
}
export default Search
