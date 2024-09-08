'use client'
import RenderField from '@/app/dashboard/property/[...propertymanagement]/_components/RenderField'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { gender } from '@/utils/dummy'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const PersonalDataSchema = z.object({
  name: z
    .string({ required_error: 'Full name is required' })
    .min(3, 'Full name at least have 3 characters'),
  gender: z.string({ required_error: 'Gender is required' }),
  dateOfBirth: z.string({ required_error: 'Date of birth is required' }).date(),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .min(11, 'Phone number at least have 11 number')
    .regex(/^[0-9]+$/, 'Only numbers are allowed'),
})

type FormData = z.infer<typeof PersonalDataSchema>

const PersonalData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(PersonalDataSchema),
    defaultValues: {
      name: 'yosef',
      gender: 'male',
    },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Card className='border-secondary'>
      <CardHeader className='border-b border-secondary p-4'>
        <CardTitle className='text-base md:text-xl'>Personal Data</CardTitle>
      </CardHeader>
      <CardContent className='py-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid w-full items-center gap-4'>
            <Input
              name='name'
              label='Full name'
              type='text'
              register={register}
              errors={errors}
            />
            <div className='grid lg:grid-cols-2 gap-x-4'>
              <Controller
                name='gender'
                control={control}
                render={({ field }) => (
                  <RenderField
                    label='Property Category'
                    render={
                      <Select
                        options={gender}
                        placeholder='Select gender'
                        onSelect={field.onChange}
                      />
                    }
                    error={errors.gender?.message}
                  />
                )}
              />
              <Input
                name='dateOfBirth'
                label='Date of birth'
                type='date'
                register={register}
                errors={errors}
              />
            </div>

            <Input
              name='phone'
              label='Phone number'
              type='text'
              register={register}
              errors={errors}
            />
          </div>
          <div className='flex gap-x-4 justify-end'>
            <Button variant='cancel' type='button'>
              Cancel
            </Button>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
export default PersonalData
