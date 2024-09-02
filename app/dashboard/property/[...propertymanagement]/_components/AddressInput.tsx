import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Input from '@/components/Input'
import { LatLngExpression } from 'leaflet'
import { useDebounce } from 'use-debounce'
import AddressSuggestion from './AddressSuggestion'
import dynamic from 'next/dynamic'

const MapWithNoSSR = dynamic(() => import('@/components/MapLeaflet'), {
  ssr: false,
})

const AddressInputSchema = z.object({
  propertyAddress: z.string({ required_error: 'Property address is required' }),
  propertyCity: z.string({ required_error: 'Property city is required' }),
  propertyProvince: z.string({
    required_error: 'Property province is required',
  }),
  propertyPostalCode: z.string({
    required_error: 'Property postal code is required',
  }),
})

type AddressInputFormData = z.infer<typeof AddressInputSchema>

interface AddressInputProps {
  onAddressChange: (data: any) => void
}

const AddressInput: React.FC<AddressInputProps> = ({ onAddressChange }) => {
  const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09])
  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestion[]
  >([])
  const [loading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddressInputFormData>({
    resolver: zodResolver(AddressInputSchema),
  })

  const addressWatch = watch('propertyAddress')
  const [debouncedAddress] = useDebounce(addressWatch, 1000)

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

    onAddressChange({
      propertyAddress: display_name,
      propertyCity: watch('propertyCity'),
      propertyProvince: watch('propertyProvince'),
      propertyPostalCode: watch('propertyPostalCode'),
      latitude: lat,
      longitude: lon,
    })
  }

  useEffect(() => {
    fetchAddressSuggestions(debouncedAddress)
  }, [debouncedAddress])

  return (
    <div className=''>
      <div className='mb-4'>
        <Input
          name='propertyAddress'
          label='Property Address'
          type='text'
          register={register}
          errors={errors}
        />

        {addressSuggestions.length > 0 && (
          <AddressSuggestion
            suggestions={addressSuggestions}
            onSelect={handleSuggestionClick}
            loading={loading}
          />
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
          label='Property postal code'
          type='text'
          register={register}
          errors={errors}
        />
      </div>

      <div className='mb-4 -z-50'>
        <label className='text-sm font-medium mb-2'>
          Pin property location
        </label>
        <div className='h-96 w-1/2'>
          <MapWithNoSSR position={position} onLocationChange={setPosition} />
        </div>
      </div>
    </div>
  )
}

export default AddressInput
