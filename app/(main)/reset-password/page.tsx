'use client'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import useResetPassword from '@/hooks/useResetPassword'
import { toast } from '@/components/ui/use-toast'

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPass: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormData = z.infer<typeof resetPasswordSchema>

const ResetPassword = () => {
  const { handleResetPassword, loading } = useResetPassword()
  const router = useRouter()
  const email = useSearchParams().get('email')
  console.log('email', email)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
    if (data.password !== data.confirmPass) {
      toast({
        variant: 'destructive',
        description: 'Password and password confirmation must be same',
      })
      return
    }
    const request = {
      email: email!,
      newPassword: data.password,
    }
    const result = await handleResetPassword(request)
    if (!result?.success) {
      toast({
        variant: 'destructive',
        description: result?.message,
      })
      return
    }
    toast({
      description: result?.message,
    })
    router.push('/')
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
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Reset'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ResetPassword
