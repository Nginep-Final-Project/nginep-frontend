import Input from '@/components/Input'
import { Controller, useForm } from 'react-hook-form'
import RenderField from './RenderField'
import Select from '@/components/Select'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputImages from './InputImages'
import { PropertyGeneralInfoSchema } from '@/utils/schema'
import useFacility from '@/hooks/useFacility'
import useCategory from '@/hooks/useCategory'
import { guestPlaceTypes } from '@/utils/dummy'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { CREATE_PROPERTY_STEP_ONE } from '@/utils/constanta'
import { PropertyDetail } from '@/types/property'

const StepOne: React.FC<{
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
  propertyData: PropertyDetail
}> = ({ currentStep, setCurrentStep, propertyData }) => {
  const { result: resultFacility, loading: loadingFacility } = useFacility()
  const { result: resultCategory, loading: loadingCategory } = useCategory()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<z.infer<typeof PropertyGeneralInfoSchema>>({
    resolver: zodResolver(PropertyGeneralInfoSchema),
    defaultValues: {
      propertyName: '',
      propertyCategory: '',
      propertyDescription: '',
      propertyFacilities: [],
      guestPlaceType: '',
      propertyImage: [],
    },
  })

  useEffect(() => {
    if (currentStep === 1) {
      const storageData = sessionStorage.getItem(CREATE_PROPERTY_STEP_ONE)
      if (storageData) {
        const parseData = JSON.parse(storageData)
        reset(parseData)
        return
      }

      if (propertyData) {
        reset({
          propertyName: propertyData.propertyName,
          propertyCategory: propertyData.propertyCategory,
          propertyDescription: propertyData.propertyDescription,
          propertyFacilities: propertyData.propertyFacilities.map(
            (e) => e.value
          ),
          guestPlaceType: propertyData.guestPlaceType,
          propertyImage: propertyData.propertyImage,
        })
      }
    }
  }, [currentStep, propertyData, reset])

  const onSubmit = (data: z.infer<typeof PropertyGeneralInfoSchema>) => {
    console.log('submit')
    console.log(data)
    setCurrentStep(2)
    sessionStorage.setItem(CREATE_PROPERTY_STEP_ONE, JSON.stringify(data))
  }

  return (
    <div>
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
                  options={resultCategory}
                  placeholder='Select property category'
                  onSelect={field.onChange}
                  initialValue={field.value}
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
                  options={resultFacility}
                  placeholder='Select facilities'
                  onSelect={field.onChange}
                  isMulti={true}
                  initialValue={field.value}
                />
              }
              error={errors.propertyFacilities?.message}
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
                  initialValue={field.value}
                />
              }
              error={errors.guestPlaceType?.message}
            />
          )}
        />
        <Controller
          name='propertyImage'
          control={control}
          render={({ field }) => (
            <RenderField
              label='Property Image'
              render={
                <InputImages
                  onUploadSuccess={(files) => field.onChange(files)}
                  initialImages={field.value}
                />
              }
              error={errors.propertyImage?.message}
            />
          )}
        />
        <div className='flex items-center gap-x-4'>
          <Progress value={(1 / 4) * 100} className='flex-grow h-2' />
          <Button type='submit'>Next</Button>
        </div>
      </form>
    </div>
  )
}
export default StepOne
