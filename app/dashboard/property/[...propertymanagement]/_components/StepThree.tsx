import Input from '@/components/Input'
import AddressSuggestion from './AddressSuggestion'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { LatLngExpression } from 'leaflet'
import { PropertyAddressSchema } from '@/utils/schema'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CREATE_PROPERTY_STEP_THREE } from '@/utils/constanta'

const MapWithNoSSR = dynamic(() => import('@/components/MapLeaflet'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

const StepThree: React.FC<{
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
}> = ({ currentStep, setCurrentStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm<z.infer<typeof PropertyAddressSchema>>({
    resolver: zodResolver(PropertyAddressSchema),
  })
  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestion[]
  >([])
  const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09])
  const [loading, setLoading] = useState(false)
  const addressWatch = watch('propertyAddress')
  const [debouncedAddress] = useDebounce(addressWatch, 1000)

  useEffect(() => {
    if (currentStep === 3) {
      const storageData = sessionStorage.getItem(CREATE_PROPERTY_STEP_THREE)
      if (storageData) {
        const parseData = JSON.parse(storageData)
        console.log(parseData)
        reset(parseData)
      }
    }
  }, [currentStep, reset])

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

  const onSubmit = (data: z.infer<typeof PropertyAddressSchema>) => {
    console.log('submit')
    console.log(data)
    setCurrentStep(4)
    sessionStorage.setItem(CREATE_PROPERTY_STEP_THREE, JSON.stringify(data))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <MapWithNoSSR position={position} onLocationChange={setPosition} />
          </div>
        </div>
        <div className='flex items-center gap-x-4'>
          <Button
            variant='cancel'
            type='button'
            onClick={() => {
              setCurrentStep(2)
            }}
          >
            Back
          </Button>
          <Progress value={(3 / 4) * 100} className='flex-grow h-2' />
          <Button type='submit'>Next</Button>
        </div>
      </form>
    </div>
  )
}
export default StepThree
