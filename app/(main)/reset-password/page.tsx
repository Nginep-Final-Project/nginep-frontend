'use client'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPass: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormData = z.infer<typeof resetPasswordSchema>

const ResetPassword = () => {
  const email = useSearchParams().get('email')
  console.log('email', email)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    reset()
  }

  return (
    <div className='flex flex-col min-h-screen items-center justify-center'>
      <div className='sm:max-w-[425px] border border-secondary rounded-md py-9'>
        <h2 className='text-xl text-center font-medium mb-4'>Reset password</h2>
        <div className='border-t border-secondary p-4'>
          <p className='mb-4'>
            Must include at least one symbol or number and have at least 8
            characters.
          </p>
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
            <Button
              type='submit'
              className='bg-black w-full text-white text-xl px-4 py-2 rounded'
            >
              Reset
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ResetPassword
