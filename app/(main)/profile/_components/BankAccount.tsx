'use client'

import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface BankAccountProps {
  initBankName: string
  initAccNumber: string
  initHolderName: string
}

const BankAccountSchema = z.object({
  bankName: z
    .string({ required_error: 'Bank name is required' })
    .min(3, 'Full name at least have 3 characters'),
  accountNumber: z
    .string({ required_error: 'Account number is required' })
    .regex(/^[0-9]+$/, 'Only numbers are allowed'),
  holderName: z.string().min(1, 'Account holder name is required'),
})

type FormData = z.infer<typeof BankAccountSchema>

const BankAccount: React.FC<BankAccountProps> = ({
  initBankName,
  initAccNumber,
  initHolderName,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(BankAccountSchema),
    defaultValues: {
      bankName: '',
      accountNumber: '',
      holderName: '',
    },
  })

  useEffect(() => {
    reset({
      bankName: initBankName,
      accountNumber: initAccNumber,
      holderName: initHolderName,
    })
  }, [initAccNumber, initBankName, initHolderName, reset])

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const onCancel = () => {
    reset({
      bankName: initBankName,
      accountNumber: initAccNumber,
      holderName: initHolderName,
    })
  }
  return (
    <Card className='border-secondary'>
      <CardHeader className='border-b border-secondary p-4'>
        <CardTitle className='text-base md:text-xl'>Bank Account</CardTitle>
      </CardHeader>
      <CardContent className='py-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='bankName'
            label='Bank name'
            type='text'
            register={register}
            errors={errors}
          />
          <Input
            name='accountNumber'
            label='Account number'
            type='text'
            register={register}
            errors={errors}
          />
          <Input
            name='holderName'
            label='Account holder name'
            type='text'
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
export default BankAccount
