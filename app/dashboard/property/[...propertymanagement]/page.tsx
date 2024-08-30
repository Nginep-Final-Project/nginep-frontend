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
  propertyCategories,
  propertyFacilities,
} from '@/utils/dummy'
import InputImages from './_components/InputImages'

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
  notAvailabilityDates: z
    .object({
      from: z.date().nullable(),
      to: z.date().nullable(),
    })
    .nullable(),
  peakSeasonDates: z
    .object({
      from: z.date().nullable(),
      to: z.date().nullable(),
    })
    .nullable(),
})

type FormData = z.infer<typeof schema>

const PropertyManagement = () => {
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

  const onSubmit = (data: FormData) => {
    console.log(data)
    reset()
  }

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
          {watch('guestPlaceType') === 'entire_place' ? (
            <Input
              name='propertyDescription'
              label='Property price'
              type='text'
              register={register}
              errors={errors}
            />
          ) : (
            <div></div>
          )}
          <Input
            name='propertyAddress'
            label='Property Address'
            type='text'
            register={register}
            errors={errors}
          />
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
    </div>
  )
}
export default PropertyManagement
