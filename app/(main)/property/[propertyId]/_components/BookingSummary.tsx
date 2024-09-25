import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { RESERVE_BOOKING_DATA } from '@/utils/constanta'
import { PropertyDetail } from '@/types/property'

interface BookingSummaryProps {
  property: PropertyDetail
  pricePerNight: number
  checkInDate: string
  checkOutDate: string
  guests: number
  roomType: string
  roomId: number
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  property,
  pricePerNight,
  checkInDate,
  checkOutDate,
  guests,
  roomType,
  roomId,
}) => {
  const calculateNights = (checkIn: string, checkOut: string): number => {
    const oneDay = 24 * 60 * 60 * 1000
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const nights = Math.round(
      Math.abs((checkOutDate.getTime() - checkInDate.getTime()) / oneDay)
    )
    return nights
  }
  const router = useRouter()
  const session = useSession()
  const nights = calculateNights(checkInDate, checkOutDate)
  const total = pricePerNight * nights

  const handleReserveBooking = () => {
    const reserveBooking = {
      property: property,
      pricePerNight: pricePerNight,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      guests: guests,
      roomType: roomType,
      roomId: roomId,
      userId: session.data?.user.id,
    }
    localStorage.setItem(RESERVE_BOOKING_DATA, JSON.stringify(reserveBooking))
    router.push(`/${roomId}/booking-summary`)
  }

  return (
    <div className='w-80 p-4 bg-white rounded-xl border-secondary shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>
        Rp {pricePerNight.toLocaleString()}{' '}
        <span className='text-base font-normal'>night</span>
      </h2>

      <div className='border border-secondary rounded-lg mb-4'>
        <div className='grid grid-cols-2 text-sm'>
          <div className='p-2 border-r border-b border-secondary'>
            <div className='font-semibold'>CHECK-IN</div>
            <div>{checkInDate}</div>
          </div>
          <div className='p-2 border-b border-secondary'>
            <div className='font-semibold'>CHECKOUT</div>
            <div>{checkOutDate}</div>
          </div>
        </div>
        <div className='p-2 border-b border-secondary'>
          <div className='font-semibold'>GUESTS</div>
          <div>
            {guests} guest{guests > 1 ? 's' : ''}
          </div>
        </div>
        <div className='p-2'>
          <div className='font-semibold'>Room</div>
          <div>{roomType}</div>
        </div>
      </div>

      <Button
        className='w-full rounded-lg mb-4'
        type='button'
        onClick={handleReserveBooking}
        disabled={roomId === 0}
      >
        Reserve
      </Button>

      <p className='text-center text-sm text-grey-text mb-4'>
        You won&apos;t be charged yet
      </p>

      <div className='flex justify-between mb-2'>
        <span>
          Rp {pricePerNight.toLocaleString()} x {nights} night
          {nights > 1 ? 's' : ''}
        </span>
        <span>Rp {total.toLocaleString()}</span>
      </div>

      <div className='flex justify-between font-bold pt-2 border-t border-grey-text'>
        <span>Total</span>
        <span>Rp {total.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default BookingSummary
