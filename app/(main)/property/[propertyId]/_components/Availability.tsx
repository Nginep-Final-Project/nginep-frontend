'use client'
import GuestDialog from '@/app/(main)/_components/GuestDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Users } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import RoomDatePicker from './RoomDatePicker'
import { PeakSeasonRate, PropertyDetail, Room } from '@/types/property'
import { addDays, format } from 'date-fns'
import useRoom from '@/hooks/useRoom'
import { SelectedRoom } from './DetailProperty'
import NoResult from '@/components/NoResult'
import Searching from '@/components/Searching'
import { formatRupiah } from '@/utils/RupiahFormatterCurrency'
import { BASE_PRICE } from '@/utils/constanta'

const Availability: React.FC<{
  property: PropertyDetail
  rooms: Room[]
  propertyId: number
  peakSeasonRates: PeakSeasonRate[]
  onSelectedRoom: (value: SelectedRoom) => void
}> = ({ property, rooms, propertyId, peakSeasonRates, onSelectedRoom }) => {
  const [dateRange, setdateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  })
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0)
  const [guest, setGuest] = useState<number>(1)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<Room[] | null>(null)
  const [basePrice, setBasePrice] = useState<number>(0)
  const { handleRoomAvailable, loading, error } = useRoom()

  const handleGuestChange = (value: number) => {
    setGuest(value)
    onSelectedRoom({
      property: property,
      pricePerNight: 0,
      checkInDate: format(dateRange?.from!, 'yyyy-MM-dd'),
      checkOutDate: format(dateRange?.to!, 'yyyy-MM-dd'),
      guests: value,
      roomType: '',
      roomId: 0,
    })
    setSelectedRoomId(0)
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
      setSelectedRoomId(0)
    }
  }

  const calculatePriceWithPeakSeason = (
    room: Room,
    startDate: Date,
    endDate: Date
  ) => {
    let totalPrice = room.basePrice
    let increase = 0
    peakSeasonRates.forEach((season) => {
      const seasonStartDate = new Date(season.peakSeasonDates.from)
      const seasonEndDate = new Date(season.peakSeasonDates.to)

      if (
        (startDate >= seasonStartDate && startDate <= seasonEndDate) ||
        (endDate >= seasonStartDate && endDate <= seasonEndDate) ||
        (startDate <= seasonStartDate && endDate >= seasonEndDate)
      ) {
        if (season.rateType === 'PERCENTAGE') {
          increase = (room.basePrice * season.rateValue) / 100
        } else {
          increase = season.rateValue
        }
      }
    })

    totalPrice += increase

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

  useEffect(() => {
    const basePriceStorage = sessionStorage.getItem(BASE_PRICE)
    if (basePriceStorage !== null) {
      const parseBasePrice = JSON.parse(basePriceStorage)
      setBasePrice(Number(parseBasePrice))
    }
  }, [])

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
            basePrice={basePrice}
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
          <NoResult message="Whoops! We've searched high and low, but the search results have gone on vacation!" />
        ) : (
          <div className='flex overflow-x-auto snap-x snap-mandatory'>
            {loading ? (
              <Searching />
            ) : (
              roomPrices.map((room) => {
                return (
                  <Card
                    key={room.id}
                    className={`flex-shrink-0 w-64 sm:w-72 md:w-80 ml-4 lg:ml-0 lg:mr-4 ${
                      selectedRoomId === room.id && 'border-primary border-2'
                    }`}
                    onClick={() => {
                      setSelectedRoomId(room.id)
                      onSelectedRoom({
                        property: property,
                        pricePerNight: room.basePrice,
                        checkInDate: format(dateRange?.from!, 'yyyy-MM-dd'),
                        checkOutDate: format(dateRange?.to!, 'yyyy-MM-dd'),
                        guests: guest,
                        roomType: room.name,
                        roomId: room.id,
                      })

                      if (selectedRoomId === room.id) {
                        setSelectedRoomId(0)
                        onSelectedRoom({
                          property: property,
                          pricePerNight: 0,
                          checkInDate: format(dateRange?.from!, 'yyyy-MM-dd'),
                          checkOutDate: format(dateRange?.to!, 'yyyy-MM-dd'),
                          guests: guest,
                          roomType: '',
                          roomId: 0,
                        })
                      }
                    }}
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
                          height={200}
                          width={100}
                          style={{ height: '200px', width: 'auto' }}
                          className='h-[200px] w-[100px] object-cover rounded-md mb-2'
                        />
                      )}

                      <h3 className='font-semibold'>{room.name}</h3>
                      <p className='text-sm text-grey-text whitespace-pre-wrap break-words line-clamp-2'>
                        {room.description}
                      </p>

                      <p className='font-bold mt-2'>
                        {`${formatRupiah(room.basePrice)} / night`}
                      </p>
                      <p className='text-xs text-grey-text'>
                        Max occupancy: {room.maxGuests} guests
                      </p>
                    </CardContent>
                  </Card>
                )
              })
            )}
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
