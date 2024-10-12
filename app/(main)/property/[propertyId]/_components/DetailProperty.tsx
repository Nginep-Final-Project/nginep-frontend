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
import { useState } from 'react'
import { addDays, format } from 'date-fns'
import { PropertyDetail } from '@/types/property'

export interface SelectedRoom {
  property: PropertyDetail
  pricePerNight: number
  checkInDate: string
  checkOutDate: string
  guests: number
  roomType: string
  roomId: number
}

const DetailProperty: React.FC<{ propertyId: number }> = ({ propertyId }) => {
  const { result, loading, error } = useProperty(propertyId)
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoom>({
    property: result,
    pricePerNight: 0,
    checkInDate: format(new Date(), 'yyyy-MM-dd'),
    checkOutDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    guests: 1,
    roomType: '',
    roomId: 0,
  })

  const handleSelectRoom = (value: SelectedRoom) => {
    setSelectedRoom(value)
  }

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
                property={result}
                rooms={result.rooms}
                propertyId={result.id}
                peakSeasonRates={result.peakSeasonRate}
                onSelectedRoom={handleSelectRoom}
              />
            </div>
          </div>
          <div className='max-md:w-full flex justify-center lg:justify-start p-4'>
            <BookingSummary {...selectedRoom} />
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
