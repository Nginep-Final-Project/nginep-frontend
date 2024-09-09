import { auth } from '@/auth'
import Hero from './_components/Hero'
import PropertyListCard from './_components/PropertyListCard'
import { propertyList } from '@/utils/dummy'
import { Button } from '@/components/ui/button'
import FilterSort from './_components/FilterSort'

const Home = () => {
  return (
    <div className='flex flex-col items-center'>
      <Hero />
      <FilterSort />
      <PropertyListCard properties={propertyList} />
      <Button className='bg-black text-white rounded-3xl mt-4 mb-16 md:mt-8 lg:mb-36'>
        Show more
      </Button>
    </div>
  )
}
export default Home
