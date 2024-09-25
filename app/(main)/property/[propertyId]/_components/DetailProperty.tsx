'use client'
import useProperty from '@/hooks/useProperty'
import Availability from './Availability'
import BookingSummary from './BookingSummary'
import Description from './Description'
import FacilityList from './FacilityList'
import Header from './Header'
import ImageGallery from './ImageGallery'
import Location from './Location'
import Review from './Review'
import TenantProfile from './TenantProfile'
import { bookingData } from '@/utils/dummy'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

const DetailProperty: React.FC<{ propertyId: number }> = ({ propertyId }) => {
  const { result, loading, error } = useProperty(propertyId)
  if (error) {
    return <Error />
  }
  return (
    <>
      <div>
        <Header
          name={result.propertyName}
          rating={result.reviewSummary.averageRating}
          reviewCount={result.reviewSummary.totalReviews}
          location={`${result.propertyCity}, ${result.propertyProvince}`}
        />
        <ImageGallery images={result.propertyImage.map((e) => e.path)} />
        <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4'>
          <div className='lg:col-span-2'>
            <div className='overflow-hidden'>
              <Description description={result.propertyDescription} />
            </div>
            <div>
              <Availability
                rooms={result.rooms}
                propertyId={result.id}
                peakSeasonRates={result.peakSeasonRate}
              />
            </div>
          </div>
          <div className='max-md:w-full flex justify-center lg:justify-start p-4'>
            <BookingSummary {...bookingData} roomId={result.rooms[0].id} />
          </div>
        </div>

        <FacilityList
          amenities={result.propertyFacilities.map((e) => e.value)}
        />
        <Review
          reviewList={result.reviewList}
          reviewSummary={result.reviewSummary}
        />
        <Location
          location={`${result.propertyCity}, ${result.propertyProvince}`}
          position={[result.propertyLatitude, result.propertyLongitude]}
        />
        <TenantProfile tenant={result.tenant} rating={result.reviewSummary} />
      </div>
      {loading && <Loading />}
    </>
  )
}
export default DetailProperty
