'use client'
import GuestDialog from '@/app/(main)/_components/GuestDialog'
import DatePicker from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { availableRooms } from '@/utils/dummy'
import { Users } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const Availability: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>()
  const [checkInOut, setCheckInOut] = useState<Date | undefined>()
  const [guest, setGuest] = useState<number>(1)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleGuestChange = (value: number) => {
    setGuest(value)
    setIsDialogOpen(false)
  }
  return (
    <div className='mb-6 lg:pl-32'>
      <h2 className='text-2xl font-bold p-4 lg:px-32 '>Availability</h2>
      <div className='space-y-4'>
        <div className='flex flex-col justify-center md:flex-row gap-4 mx-4 mb-4'>
          <DatePicker
            mode='single'
            value={checkInDate}
            placeholder='Checkin date'
            onChange={setCheckInDate}
          />
          <DatePicker
            mode='single'
            value={checkInOut}
            placeholder='Checkout date'
            onChange={setCheckInOut}
          />
          <Button
            variant='outline'
            onClick={() => setIsDialogOpen(true)}
            className='gap-x-4 justify-between'
          >
            {`${guest} Guests`} <Users size={20} />
          </Button>
        </div>
        <div className='flex overflow-x-auto snap-x snap-mandatory'>
          {availableRooms.map((room) => (
            <Card
              key={room.id}
              className='flex-shrink-0 w-64 sm:w-72 md:w-80 ml-4 md:ml-0 md:mr-4'
            >
              <CardContent className='p-4 flex flex-col justify-center'>
                <Image
                  src={room.image}
                  alt={room.name}
                  height={50}
                  width={50}
                  style={{ height: '100', width: 'auto' }}
                  className='object-cover rounded-md mb-2'
                />
                <h3 className='font-semibold'>{room.name}</h3>
                <p className='text-sm text-grey-text whitespace-pre-wrap break-words line-clamp-2'>
                  {room.description}
                </p>
                <ul className='text-xs text-grey-text mt-2'>
                  {room.amenities.slice(0, 5).map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
                <p className='font-bold mt-2'>
                  {room.currency} {room.price.toLocaleString()} / night
                </p>
                <p className='text-xs text-grey-text'>
                  Max occupancy: {room.maxOccupancy} guests
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <GuestDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onChange={handleGuestChange}
      />
    </div>
  )
}

export default Availability
