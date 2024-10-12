import ImageCarousel from '@/components/ImageCarousel'

const HeroCarousel = [
  'https://res.cloudinary.com/dhbg53ncx/image/upload/v1727069223/lh7secboby40flx8leds.svg',
  'https://res.cloudinary.com/dhbg53ncx/image/upload/v1727069218/oixet81hm9nb4p9wkplu.svg',
  'https://res.cloudinary.com/dhbg53ncx/image/upload/v1727069213/e1j5lsbtx7aijgubpq6x.svg',
  'https://res.cloudinary.com/dhbg53ncx/image/upload/v1727069211/iaovkd20gzwn3ltnzh8f.svg',
]

const Hero = () => {
  return (
    <div className='bg-primary w-full flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:justify-between p-4 md:px-14 md:py-24'>
      <div className='md:w-1/2 flex flex-col justify-center gap-y-1 md:gap-y-4'>
        <h2 className='font-medium md:font-bold text-sm md:text-xl text-white'>
          Search and book cheap properties here!
        </h2>
        <p className='font-normal md:font-medium text-sm md:text-xl text-white'>
          Find the best deals on every Nginep product you need!
        </p>
      </div>
      <div className='md:w-1/2 flex justify-center'>
        <ImageCarousel showNavigation={true} imageSrc={HeroCarousel} />
      </div>
    </div>
  )
}
export default Hero
