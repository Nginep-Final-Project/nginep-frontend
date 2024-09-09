'use client'

import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ChangePasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPass: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormData = z.infer<typeof ChangePasswordSchema>

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    reset()
  }
  return (
    <Card className='border-secondary'>
      <CardHeader className='border-b border-secondary p-4'>
        <CardTitle className='text-base md:text-xl'>Change Password</CardTitle>
      </CardHeader>
      <CardDescription className='px-4 pt-4'>
        Must include at least one symbol or number and have at least 8
        characters.
      </CardDescription>
      <CardContent className='py-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='password'
            label='password'
            type='password'
            register={register}
            errors={errors}
          />
          <Input
            name='confirmPass'
            label='Confirmation Password'
            type='password'
            register={register}
            errors={errors}
          />
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
export default ChangePassword
