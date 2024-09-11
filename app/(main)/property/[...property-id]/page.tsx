import { bookingData, reviewData, tenantData } from '@/utils/dummy'
import Description from './_components/Description'
import FacilityList from './_components/FacilityList'
import ImageGallery from './_components/ImageGallery'
import Review from './_components/Review'
import Location from './_components/Location'
import TenantProfile from './_components/TenantProfile'
import BookingSummary from './_components/BookingSummary'
import Availability from './_components/Availability'
import Header from './_components/Header'

const PropertyDetail = () => {
  return (
    <div>
      <Header
        name='JW Marriott Hotel Medan'
        rating={4.83}
        reviewCount={1800}
        location='Nusa Ceningan, Bali, Indonesia'
      />
      <ImageGallery
        images={[
          'https://dummyimage.com/300x200/000/fff',
          'https://dummyimage.com/400x300/00ff00/000',
          'https://dummyimage.com/600x400/0000ff/fff',
          'https://dummyimage.com/300x200/000/fff',
          'https://dummyimage.com/400x300/00ff00/000',
          'https://dummyimage.com/400x300/00ff00/000',
          'https://dummyimage.com/600x400/0000ff/fff',
        ]}
      />
      <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2'>
          <div className='overflow-hidden'>
            <Description description='https://dummyimage.com/300x200/000/fffhttps://dummyimage.com/400x300/00ff00/000https://dummyimage.com/600x400/0000ff/fffhttps://dummyimage.com/300x200/000/fffhttps://dummyimage.com/400x300/00ff00/000https://dummyimage.com/400x300/00ff00/000https://dummyimage.com/600x400/0000ff/fff' />
          </div>
          <div>
            <Availability />
          </div>
        </div>
        <div className='max-md:w-full flex justify-center lg:justify-start p-4'>
          <BookingSummary {...bookingData} />
        </div>
      </div>

      <FacilityList
        amenities={[
          'Wifi',
          'TV',
          'Private Pool',
          'Free parking on premises',
          'TV',
        ]}
      />
      <Review {...reviewData} />
      <Location
        location={'Medan, Indonesia'}
        position={[3.597031, 98.678513]}
      />
      <TenantProfile {...tenantData} />
    </div>
  )
}
export default PropertyDetail
