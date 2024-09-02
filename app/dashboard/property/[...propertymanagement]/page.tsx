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

const MapWithNoSSR = dynamic(() => import('@/components/MapLeaflet'), {
  ssr: false,
})
const roomSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Room name is required'),
  description: z.string().min(1, 'Room description is required'),
  guests: z
    .number()
    .min(1, 'At least 1 guest is required')
    .max(10, 'Maximum 10 guests allowed'),
  price: z.number().min(0, 'Price must be a positive number'),
})

const schema = z.object({
  propertyName: z.string().min(1, 'Property name is required'),
  propertyCategory: z.string({
    required_error: 'Property category is required',
  }),
  propertyDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters'),
  propertyFacilities: z
    .array(
      z.string({
        required_error: 'Property category is required',
      })
    )
    .min(1, 'Select at least one facility'),
  propertyPrice: z
    .string()
    .min(1, 'Property price is required')
    .regex(/^[0-9]+$/, 'Only numbers are allowed'),
  guestPlaceType: z.string({
    required_error: 'Property type is required',
  }),
  propertyImages: z
    .array(z.instanceof(File))
    .min(1, 'At least one image is required'),
  propertyAddress: z.string().min(1, 'Property address is required'),
  propertyCity: z.string().min(1, 'Property city is required'),
  propertyProvince: z.string().min(1, 'Property province is required'),
  propertyPostalCode: z.string().min(1, 'Property postal code is required'),
  propertyLatitude: z.string(),
  propertyLongitude: z.string(),
  notAvailabilityDates: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  peakSeasonDates: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  rooms: z.array(roomSchema).optional(),
  peakSeasonRate: z
    .object({
      incrementType: z.string(),
      amount: z.number().min(0, 'Price must be a positive number'),
    })
    .optional(),
})
// .refine(
//   (data) => {
//     if (
//       data.guestPlaceType === 'private_room' &&
//       (!data.rooms || data.rooms.length === 0)
//     ) {
//       return false
//     }
//     return true
//   },
//   {
//     message:
//       'At least one room is required for private room type, and peak season rate is required when peak season dates are filled.',
//     path: ['rooms'],
//   }
// )

type FormData = z.infer<typeof schema>

const PropertyManagement = () => {
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<RoomFormValues | null>(null)
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
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const addressWatch = watch('propertyAddress')
  const [debouncedAddress] = useDebounce(addressWatch, 1000)

  const onSubmit = (data: FormData) => {
    console.log(data)
    // reset()
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
    setValue('peakSeasonRate', peakSeasonRate)
    setIsPeakSeasonPriceOpen(false)
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
  return (
    <div>
      <div>
        <h2 className='font-semibold md:text-2xl mb-4'>Add Property</h2>
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
          {watch('guestPlaceType') === 'entire_place' && (
            <Input
              name='propertyPrice'
              label='Property price'
              type='text'
              register={register}
              errors={errors}
            />
          )}
          {watch('guestPlaceType') === 'private_room' && (
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
                  <div
                    key={room.id}
                    className='grid grid-cols-4 border rounded'
                  >
                    <div className='border-r p-4'>
                      <h4 className='font-medium'>{room.name}</h4>
                      <p className='text-sm'>{room.description}</p>
                    </div>
                    <div className='border-r p-4'>
                      <h4 className='font-medium'>Guests</h4>
                      <p className='text-sm'>{room.guests}</p>
                    </div>

                    <div className='border-r p-4'>
                      <h4 className='font-medium'>Price</h4>
                      <p className='text-sm'>Rp{room.price} /night</p>
                    </div>
                    <div className='flex flex-col items-start px-4'>
                      <Button
                        variant='link'
                        onClick={() => handleEditRoom(room)}
                        className='font-semibold p-0'
                      >
                        Edit
                      </Button>
                      <Button
                        variant='link'
                        onClick={() => handleDeleteRoom(room.id!)}
                        className='font-semibold text-primary p-0'
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
            <div className='h-96 w-1/2'>
              <MapWithNoSSR
                position={position}
                onLocationChange={setPosition}
              />
            </div>
          </div>

          <Controller
            name='notAvailabilityDates'
            control={control}
            render={({ field }) => (
              <RenderField
                label='Property not availability datess'
                render={
                  <DatePicker
                    value={field.value as DateRange}
                    onChange={(value) => field.onChange(value)}
                    placeholder='Select not availability dates'
                  />
                }
                error={errors.notAvailabilityDates?.message}
              />
            )}
          />
          <Controller
            name='peakSeasonDates'
            control={control}
            render={({ field }) => (
              <RenderField
                label='Property peak season dates'
                render={
                  <DatePicker
                    value={field.value as DateRange}
                    onChange={(value) => field.onChange(value)}
                    placeholder='Select not availability dates'
                  />
                }
                error={errors.peakSeasonDates?.message}
              />
            )}
          />
          {watch('peakSeasonDates') && (
            <div className='flex gap-x-4 items-center'>
              <Button
                type='button'
                onClick={() => setIsPeakSeasonPriceOpen(true)}
              >
                Set Peak Season Price
              </Button>
              <h3>
                Property and room price increase{' '}
                {watch('peakSeasonRate')?.amount}{' '}
                {watch('peakSeasonRate')?.incrementType === 'percentage'
                  ? '%'
                  : ''}
              </h3>
              {errors.peakSeasonRate?.message}
            </div>
          )}

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
      />
      <RoomDialog
        open={isRoomDialogOpen}
        onOpenChange={setIsRoomDialogOpen}
        onSave={handleSaveRoom}
        initialRoom={editingRoom}
      />
    </div>
  )
}
export default PropertyManagement
