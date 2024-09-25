'use client'
import GuestDialog from '@/app/(main)/_components/GuestDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Users } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import RoomDatePicker from './RoomDatePicker'
import { PeakSeasonRate, Room } from '@/types/property'
import { addDays, format } from 'date-fns'
import useRoom from '@/hooks/useRoom'

const Availability: React.FC<{
  rooms: Room[]
  propertyId: number
  peakSeasonRates: PeakSeasonRate[]
}> = ({ rooms, propertyId, peakSeasonRates }) => {
  const [dateRange, setdateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  })

  const [guest, setGuest] = useState<number>(1)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<Room[] | null>(null)
  const { handleRoomAvailable, loading, error } = useRoom()

  const handleGuestChange = (value: number) => {
    setGuest(value)
    setIsDialogOpen(false)
  }
  const handleSearch = async () => {
    if (dateRange?.from && dateRange.to) {
      const request = {
        startDate: format(dateRange.from, 'yyyy-MM-dd'),
        endDate: format(dateRange.to, 'yyyy-MM-dd'),
        totalGuest: guest,
        propertyId: propertyId,
      }
      const result = await handleRoomAvailable(request)
      setSearchResult(result?.data)
    }
  }

  const calculatePriceWithPeakSeason = (
    room: Room,
    startDate: Date,
    endDate: Date
  ) => {
    let totalPrice = room.basePrice
    peakSeasonRates.forEach((season) => {
      const seasonStartDate = new Date(season.peakSeasonDates.from)
      const seasonEndDate = new Date(season.peakSeasonDates.to)

      if (
        (startDate >= seasonStartDate && startDate <= seasonEndDate) ||
        (endDate >= seasonStartDate && endDate <= seasonEndDate) ||
        (startDate <= seasonStartDate && endDate >= seasonEndDate)
      ) {
        totalPrice +=
          season.rateType === 'PERCENTAGE'
            ? (room.basePrice * season.rateValue) / 100
            : season.rateValue
      }
    })
    return totalPrice
  }

  const roomPrices = useMemo(() => {
    let data = rooms

    if (searchResult !== null) {
      data = searchResult.length > 0 ? searchResult : []
    }

    if (dateRange?.from && dateRange?.to && data.length > 0) {
      const startDate = new Date(dateRange.from)
      const endDate = new Date(dateRange.to)

      return data.map((room) => ({
        ...room,
        basePrice: calculatePriceWithPeakSeason(room, startDate, endDate),
      }))
    }

    return data
  }, [rooms, searchResult, peakSeasonRates])

  return (
    <div className='mb-6 lg:pl-32'>
      <h2 className='text-2xl font-bold pl-4 lg:pl-0 pb-4'>Availability</h2>
      <div className='space-y-4'>
        <div className='flex flex-col justify-center md:flex-row gap-4 mx-4 mb-4'>
          <RoomDatePicker
            value={dateRange}
            onChange={(value) => {
              setdateRange(value)
            }}
            basePrice={rooms[0].basePrice}
            peakSeasonRate={peakSeasonRates}
          />
          <Button
            variant='outline'
            onClick={() => setIsDialogOpen(true)}
            className='gap-x-4 justify-between'
          >
            {`${guest} Guests`} <Users size={20} />
          </Button>

          <Button onClick={handleSearch}>Search</Button>
        </div>
        {roomPrices.length === 0 ? (
          <div className='w-full flex items-center justify-center'>
            There is not an available room yet
          </div>
        ) : (
          <div className='flex overflow-x-auto snap-x snap-mandatory'>
            {roomPrices.map((room) => {
              return (
                <Card
                  key={room.id}
                  className='flex-shrink-0 w-64 sm:w-72 md:w-80 ml-4 lg:ml-0 lg:mr-4'
                >
                  <CardContent className='p-4 flex flex-col justify-center'>
                    {!room.roomPicture ? (
                      <div>Loading...</div>
                    ) : room.roomPicture.length === 0 ? (
                      <div>No images available</div>
                    ) : (
                      <Image
                        src={room.roomPicture}
                        alt={room.name}
                        height={100}
                        width={100}
                        style={{ height: 'auto', width: 'auto' }}
                        className='h-[100px] w-[100px] object-cover rounded-md mb-2'
                      />
                    )}

                    <h3 className='font-semibold'>{room.name}</h3>
                    <p className='text-sm text-grey-text whitespace-pre-wrap break-words line-clamp-2'>
                      {room.description}
                    </p>
                    <p className='text-xs text-grey-text'>
                      Total available room: {room.totalRoom}
                    </p>
                    <p className='font-bold mt-2'>
                      Rp {room.basePrice.toLocaleString()} / night
                    </p>
                    <p className='text-xs text-grey-text'>
                      Max occupancy: {room.maxGuests} guests
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
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
