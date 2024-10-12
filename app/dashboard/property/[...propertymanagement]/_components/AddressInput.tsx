import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { LatLngExpression } from 'leaflet'
import dynamic from 'next/dynamic'
import AddressSuggestion from './AddressSuggestion'

const MapWithNoSSR = dynamic(() => import('@/components/MapLeaflet'), {
  ssr: false,
})

interface AddressInputProps {
  addressData: {
    propertyAddress: string
    propertyLatitude: string
    propertyLongitude: string
  }
  onAddressChange: (data: any) => void
  setFieldValue: (fieldName: string, value: any) => void
}

const AddressInput: React.FC<AddressInputProps> = ({
  addressData,
  onAddressChange,
  setFieldValue,
}) => {
  const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09])
  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestion[]
  >([])
  const [loading, setLoading] = useState(false)
  const [debouncedAddress] = useDebounce(addressData.propertyAddress, 1000)

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
    setFieldValue('propertyAddress', display_name)
    const newPosition: LatLngExpression = [parseFloat(lat), parseFloat(lon)]
    setPosition(newPosition)
    setAddressSuggestions([])

    onAddressChange({
      ...addressData,
      propertyAddress: display_name,
      propertyLatitude: lat,
      propertyLongitude: lon,
    })
  }

  useEffect(() => {
    fetchAddressSuggestions(debouncedAddress)
  }, [debouncedAddress])

  return (
    <div className=''>
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
          <MapWithNoSSR position={position} onLocationChange={setPosition} />
        </div>
      </div>
    </div>
  )
}

export default AddressInput
