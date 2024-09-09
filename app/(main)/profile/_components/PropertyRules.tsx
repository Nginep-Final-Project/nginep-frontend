'use client'

import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface PropertyRulesProps {
  initCheckin: string
  initCheckout: string
  initCancelPolicy: string
}

const BankAccountSchema = z.object({
  Checkin: z
    .string({ required_error: 'Check in time is required' })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Invalid time format' }),
  Checkout: z
    .string({ required_error: 'Check out time is required' })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Invalid time format' }),
  cancelPolicy: z
    .string()
    .min(20, 'Cancellation policy at least have 20 characters'),
})

type FormData = z.infer<typeof BankAccountSchema>

const PropertyRules: React.FC<PropertyRulesProps> = ({
  initCheckin,
  initCheckout,
  initCancelPolicy,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(BankAccountSchema),
    defaultValues: {
      Checkin: '',
      Checkout: '',
      cancelPolicy: '',
    },
  })

  useEffect(() => {
    reset({
      Checkin: initCheckin,
      Checkout: initCheckout,
      cancelPolicy: initCancelPolicy,
    })
  }, [initCancelPolicy, initCheckin, initCheckout, reset])

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const onCancel = () => {
    reset({
      Checkin: initCheckin,
      Checkout: initCheckout,
      cancelPolicy: initCancelPolicy,
    })
  }

  return (
    <Card className='border-secondary'>
      <CardHeader className='border-b border-secondary p-4'>
        <CardTitle className='text-base md:text-xl'>Property Rules</CardTitle>
      </CardHeader>
      <CardContent className='py-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='Checkin'
            label='Check in time'
            type='time'
            register={register}
            errors={errors}
          />
          <Input
            name='Checkout'
            label='Check out time'
            type='time'
            register={register}
            errors={errors}
          />
          <Input
            name='cancelPolicy'
            label='Cancellation policy '
            type='textarea'
            register={register}
            errors={errors}
          />
          <div className='flex gap-x-4 justify-end'>
            <Button variant='cancel' type='button' onClick={onCancel}>
              Cancel
            </Button>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
export default PropertyRules
