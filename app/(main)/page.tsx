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

const Home = () => {
  const { result, loading, error } = useHome()

  if (error) {
    return <Error />
  }

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='p-4 w-full'>
          <AlertHandler />
        </div>
        <Hero />
        <FilterSort categories={result.categories} cities={result.cities} />
        <PropertyListCard properties={result.properties.content} />
        <Button className='bg-black text-white rounded-3xl mt-4 mb-16 md:mt-8 lg:mb-36'>
          Show more
        </Button>
      </div>
      {loading && <Loading />}
    </>
  )
}
export default Home
