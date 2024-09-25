'use client'

import { useParams, useRouter } from 'next/navigation'
import InformationSummary from './_components/InformationSummary/InformationSummary'
import PriceSummary from '../_components/PriceSummary/PriceSummary'
import TransactionLayout from '../_components/TransactionLayout/TransactionLayout'
import { useEffect, useState } from 'react'
import { useCheckExistingPendingBooking } from '@/hooks'
import { RESERVE_BOOKING_DATA } from '@/utils/constanta'
import { SelectedRoom } from '@/app/(main)/property/[propertyId]/_components/DetailProperty'

const BookingSummary = () => {
  const params = useParams()
  const roomId = params.roomId as string
  const router = useRouter()
  const [reserveBooking, setReserveBooking] = useState<SelectedRoom>()

  const userId = 11

  const { data: existingBookingId, isLoading } = useCheckExistingPendingBooking(
    userId,
    parseInt(roomId)
  )

  useEffect(() => {
    if (existingBookingId) {
      router.push(`/${roomId}/payment-process`)
    }
    const storeReserveBooking = localStorage.getItem(RESERVE_BOOKING_DATA)
    if (storeReserveBooking) {
      const parseStoredData = JSON.parse(storeReserveBooking)
      console.log(parseStoredData)
      setReserveBooking(parseStoredData)
    }
  }, [])

  return (
    <TransactionLayout title='Booking Summary'>
      <InformationSummary roomId={roomId} />
      <PriceSummary
        roomId={roomId}
        propertyName={reserveBooking?.property.propertyName ?? ''}
        roomName={reserveBooking?.roomType ?? ''}
        city={reserveBooking?.property.propertyCity ?? ''}
        province={reserveBooking?.property.propertyProvince ?? ''}
        basePrice={reserveBooking?.pricePerNight ?? 0}
        coverImage={
          reserveBooking?.property.propertyImage[0].path ??
          'https://static.wikia.nocookie.net/adventuretimesuperfans/images/1/17/Ooo.jpg/revision/latest?cb=20120415202605'
        }
      />
    </TransactionLayout>
  )
}

export default BookingSummary
