'use client'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import RenderField from './_components/RenderField'
import DatePicker from '@/components/DatePicker'
import { DateRange } from 'react-day-picker'
import {
  guestPlaceTypes,
  incrementType,
  propertyCategories,
  propertyFacilities,
} from '@/utils/dummy'
import InputImages from './_components/InputImages'
import { useEffect, useState } from 'react'
import RoomDialog, { RoomFormValues } from './_components/RoomDialog'
import PeakSeasonRate, {
  PeakSeasonRateFormValues,
} from './_components/PeakSeasonRate'
import AddressInput from './_components/AddressInput'
import AddressSuggestion from './_components/AddressSuggestion'
import dynamic from 'next/dynamic'
import { LatLngExpression } from 'leaflet'
import { useDebounce } from 'use-debounce'
import { toast } from '@/components/ui/use-toast'
import { createPropertySchema } from '@/utils/schema'
import moment from 'moment'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import StepTwo from './_components/StepTwo'
import StepOne from './_components/StepOne'
import StepThree from './_components/StepThree'
import StepFour from './_components/StepFour'

const MapWithNoSSR = dynamic(() => import('@/components/MapLeaflet'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

const PropertyManagement = () => {
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<RoomFormValues | null>(null)
  const [editingPeakSeason, setEditingPeakSeason] =
    useState<PeakSeasonRateFormValues | null>(null)
  const [isPeakSeasonPriceOpen, setIsPeakSeasonPriceOpen] = useState(false)
  const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09])
  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestion[]
  >([])
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm<z.infer<typeof createPropertySchema>>({
    resolver: zodResolver(createPropertySchema),
  })
  const addressWatch = watch('propertyAddress')
  const [debouncedAddress] = useDebounce(addressWatch, 1000)

  const onSubmit = (data: z.infer<typeof createPropertySchema>) => {
    console.log('submit')
    console.log(data)
  }

  const handleSaveRoom = (room: RoomFormValues) => {
    const currentRooms = watch('rooms') || []
    if (editingRoom) {
      setValue(
        'rooms',
        currentRooms.map((r) =>
          r.id === editingRoom.id ? { ...room, id: editingRoom.id } : r
        )
      )
    } else {
      setValue('rooms', [
        ...currentRooms,
        { ...room, id: Date.now().toString() },
      ])
    }
    setEditingRoom(null)
    setIsRoomDialogOpen(false)
  }

  const handleEditRoom = (room: RoomFormValues) => {
    setEditingRoom(room)
    setIsRoomDialogOpen(true)
  }

  const handleDeleteRoom = (id: string) => {
    const currentRooms = watch('rooms') || []
    setValue(
      'rooms',
      currentRooms.filter((room) => room.id !== id)
    )
  }

  const handleSavePeakSeasonRate = (
    peakSeasonRate: PeakSeasonRateFormValues
  ) => {
    const currentPeakSeasonRates = watch('peakSeasonRate') || []
    if (editingPeakSeason) {
      setValue(
        'peakSeasonRate',
        currentPeakSeasonRates.map((p) =>
          p.id === editingPeakSeason.id
            ? {
                ...peakSeasonRate,
                id: editingPeakSeason.id,
              }
            : p
        )
      )
    } else {
      setValue('peakSeasonRate', [
        ...currentPeakSeasonRates,
        { ...peakSeasonRate, id: Date.now().toString() },
      ])
    }
    setEditingPeakSeason(null)
    setIsPeakSeasonPriceOpen(false)
  }

  const handleEditPeakSeasonRate = (
    peakSeasonRate: PeakSeasonRateFormValues
  ) => {
    setEditingPeakSeason(peakSeasonRate)
    setIsPeakSeasonPriceOpen(true)
  }

  const handleDeletePeakSeason = (id: string) => {
    const currentPeakSeason = watch('peakSeasonRate') || []
    setValue(
      'peakSeasonRate',
      currentPeakSeason.filter((peakSeasonRate) => peakSeasonRate.id !== id)
    )
  }

  const fetchAddressSuggestions = async (query: string | undefined) => {
    setLoading(true)
    if (query && query.length > 3) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      )
      const data: AddressSuggestion[] = await response.json()
      setAddressSuggestions(data)
    }
    setLoading(false)
  }

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    const { lat, lon, display_name } = suggestion
    setValue('propertyAddress', display_name)
    const newPosition: LatLngExpression = [parseFloat(lat), parseFloat(lon)]
    setPosition(newPosition)
    setAddressSuggestions([])

    setValue('propertyLatitude', lat)
    setValue('propertyLongitude', lon)
  }

  useEffect(() => {
    fetchAddressSuggestions(debouncedAddress)
  }, [debouncedAddress])

  const [currentStep, setCurrentStep] = useState<number>(1)

  return (
    <div className='p-4 lg:px-32 '>
      <h2 className='font-semibold md:text-2xl mb-4'>Create Property</h2>
      {currentStep === 1 && (
        <StepOne currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 2 && (
        <StepTwo currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 3 && (
        <StepThree currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 4 && (
        <StepFour currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}

      {/* <div>
     
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='propertyName'
            label='Property name'
            type='text'
            register={register}
            errors={errors}
          />
          <Controller
            name='propertyCategory'
            control={control}
            render={({ field }) => (
              <RenderField
                label='Property Category'
                render={
                  <Select
                    options={propertyCategories}
                    placeholder='Select property category'
                    onSelect={field.onChange}
                  />
                }
                error={errors.propertyCategory?.message}
              />
            )}
          />
          <Input
            name='propertyDescription'
            label='Property description'
            type='textarea'
            register={register}
            errors={errors}
          />
          <Controller
            name='propertyFacilities'
            control={control}
            render={({ field }) => (
              <RenderField
                label='Property Facilities'
                render={
                  <Select
                    options={propertyFacilities}
                    placeholder='Select facilities'
                    onSelect={field.onChange}
                    isMulti={true}
                  />
                }
                error={errors.propertyFacilities?.message}
              />
            )}
          />
          <Controller
            name='propertyImages'
            control={control}
            render={({ field }) => (
              <RenderField
                label='Property Image'
                render={
                  <InputImages
                    onImagesChange={(files) => field.onChange(files)}
                  />
                }
                error={errors.propertyImages?.message}
              />
            )}
          />
          <Controller
            name='guestPlaceType'
            control={control}
            render={({ field }) => (
              <RenderField
                label='What type of place will guests have?'
                render={
                  <Select
                    options={guestPlaceTypes}
                    placeholder='Select type of place'
                    onSelect={field.onChange}
                  />
                }
                error={errors.guestPlaceType?.message}
              />
            )}
          />

          <div>
            <div className='flex gap-x-4 items-center'>
              <h3 className='text-sm font-medium'>Property room</h3>
              <Button type='button' onClick={() => setIsRoomDialogOpen(true)}>
                Add Room
              </Button>
            </div>

            {errors.rooms && (
              <p className='text-red-500 mt-1'>{errors.rooms.message}</p>
            )}
            <div className='mt-1 mb-4 space-y-4'>
              {watch('rooms')?.map((room) => (
                <Card
                  key={room.id}
                  className={`flex-shrink-0 w-44 ml-4 lg:ml-0 lg:mr-4 `}
                >
                  <CardContent className='p-4 flex flex-col justify-center'>
                    {!room.roomImage ? (
                      <div>Loading...</div>
                    ) : (
                      <Image
                        src={URL.createObjectURL(room.roomImage)}
                        alt={room.name}
                        height={150}
                        width={150}
                        style={{ height: '150px', width: '150px' }}
                        className='h-[150px] w-[150px] object-cover rounded-md mb-2'
                      />
                    )}

                    <h3 className='font-semibold'>{room.name}</h3>
                    <p className='text-sm text-grey-text whitespace-pre-wrap break-words line-clamp-2'>
                      {room.description}
                    </p>

                    <p className='font-bold mt-2'>
                      Rp {room.basePrice.toLocaleString()} / night
                    </p>
                    <p className='text-xs text-grey-text'>
                      Max guests: {room.maxGuests}
                    </p>
                    <div className='flex justify-between mt-4'>
                      <Button
                        variant='cancel'
                        onClick={() => handleDeleteRoom(room.id!)}
                        className='font-semibold text-primary '
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => handleEditRoom(room)}
                        className='font-semibold '
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Input
            name='propertyCity'
            label='Property City'
            type='text'
            register={register}
            errors={errors}
          />
          <Input
            name='propertyProvince'
            label='Property Province'
            type='text'
            register={register}
            errors={errors}
          />
          <Input
            name='propertyPostalCode'
            label='Property Postal Code'
            type='text'
            register={register}
            errors={errors}
          />
          <Input
            name='propertyAddress'
            label='Property Address'
            type='text'
            register={register}
            errors={errors}
          />
          {loading ? (
            <div>loading...</div>
          ) : (
            addressSuggestions.length > 0 && (
              <AddressSuggestion
                suggestions={addressSuggestions}
                onSelect={handleSuggestionClick}
              />
            )
          )}

          <div className='mb-4 -z-50'>
            <label className='text-sm font-medium mb-2'>
              Pin property location
            </label>
            <div className='h-96 w-full'>
              <MapWithNoSSR
                position={position}
                onLocationChange={setPosition}
              />
            </div>
          </div>

          <div>
            <div className='flex gap-x-4 items-center'>
              <h3 className='text-sm font-medium'>
                Peak Season Rate Management
              </h3>
              <Button
                type='button'
                onClick={() => setIsPeakSeasonPriceOpen(true)}
              >
                Add Peak Season
              </Button>
            </div>

            {errors.peakSeasonRate && (
              <p className='text-red-500 mt-1'>
                {errors.peakSeasonRate.message}
              </p>
            )}
            <div className='mt-1 mb-4 space-y-4'>
              {watch('peakSeasonRate')?.map((peakSeason) => (
                <div
                  key={peakSeason.id}
                  className='grid grid-cols-4 border rounded'
                >
                  <div className='border-r p-4'>
                    <h4 className='font-medium'>Date: </h4>
                    <p className='text-sm'>
                      from:{' '}
                      {moment(peakSeason.peakSeasonDates?.from).format(
                        'YYYY-MM-DD'
                      )}
                      <br />
                      to:{' '}
                      {moment(peakSeason.peakSeasonDates?.to).format(
                        'YYYY-MM-DD'
                      )}
                    </p>
                  </div>

                  <div className='border-r p-4'>
                    <h4 className='font-medium'>Rate value</h4>
                    {peakSeason.rateType === 'PERCENTAGE' ? (
                      <p className='text-sm'>{peakSeason.rateValue}% /night</p>
                    ) : (
                      <p className='text-sm'>Rp{peakSeason.rateValue} /night</p>
                    )}
                  </div>
                  <div className='flex flex-col items-start px-4'>
                    <Button
                      variant='link'
                      onClick={() => handleEditPeakSeasonRate(peakSeason)}
                      className='font-semibold p-0'
                    >
                      Edit
                    </Button>
                    <Button
                      variant='link'
                      onClick={() => handleDeletePeakSeason(peakSeason.id!)}
                      className='font-semibold text-primary p-0'
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-6 flex justify-end space-x-4'>
            <Button
              variant='cancel'
              type='button'
              className='px-4 py-2 text-primary rounded hover:bg-grey-text'
            >
              Cancel
            </Button>
            <Button type='submit' className='px-4 py-2'>
              Save
            </Button>
          </div>
        </form>
      </div>
      <PeakSeasonRate
        open={isPeakSeasonPriceOpen}
        onOpenChange={setIsPeakSeasonPriceOpen}
        onSave={handleSavePeakSeasonRate}
        initialPeakSeason={editingPeakSeason}
      />
      <RoomDialog
        open={isRoomDialogOpen}
        onOpenChange={setIsRoomDialogOpen}
        onSave={handleSaveRoom}
        initialRoom={editingRoom}
      /> */}
    </div>
  )
}
export default PropertyManagement
