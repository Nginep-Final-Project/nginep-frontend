import { reviewData, tenantData } from '@/utils/dummy'
import Description from './_components/Description'
import FacilityList from './_components/FacilityList'
import ImageGallery from './_components/ImageGallery'
import Review from './_components/Review'
import Location from './_components/Location'
import TenantProfile from './_components/TenantProfile'

const PropertyDetail = () => {
  return (
    <div>
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
      <div className='grid md:grid-cols-2'>
        <div className='overflow-hidden'>
          <Description description='https://dummyimage.com/300x200/000/fffhttps://dummyimage.com/400x300/00ff00/000https://dummyimage.com/600x400/0000ff/fffhttps://dummyimage.com/300x200/000/fffhttps://dummyimage.com/400x300/00ff00/000https://dummyimage.com/400x300/00ff00/000https://dummyimage.com/600x400/0000ff/fff' />
        </div>
        <div></div>
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
