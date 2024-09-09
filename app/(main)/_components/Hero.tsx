import ImageCarousel from '@/components/ImageCarousel'
import { propertyList } from '@/utils/dummy'

const Hero = () => {
  return (
    <div className='bg-primary flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:justify-between p-4 md:px-14 md:py-24'>
      <div className='md:w-1/2 flex flex-col justify-center gap-y-1 md:gap-y-4'>
        <h2 className='font-medium md:font-bold text-sm md:text-xl text-white'>
          Search and book cheap properties here!
        </h2>
        <p className='font-normal md:font-medium text-sm md:text-xl text-white'>
          Find the best deals on every Traveloka product you need!
        </p>
      </div>
      <div className='md:w-1/2 flex justify-center'>
        <ImageCarousel
          showNavigation={true}
          imageSrc={propertyList[0].imageSrc}
        />
      </div>
    </div>
  )
}
export default Hero
