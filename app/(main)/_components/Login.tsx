import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import GoogleIcon from '@/public/google-icon.svg'
import React, { Dispatch, SetStateAction } from 'react'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormData = z.infer<typeof loginSchema>

const Login: React.FC<{
  isLogin: boolean
  setIsLogin: Dispatch<SetStateAction<boolean>>
}> = ({ isLogin, setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Dialog open={isLogin} onOpenChange={setIsLogin}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-xl text-center'>
            Log in or sign up
          </DialogTitle>
        </DialogHeader>
        <div className='border-t border-secondary py-4'>
          <h2 className='font-semibold text-2xl mb-4'>Welcome to Nginep</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name='email'
              label='Email'
              type='email'
              register={register}
              errors={errors}
            />
            <Input
              name='password'
              label='Password'
              type='password'
              register={register}
              errors={errors}
            />
            <Button variant='link' className='p-0' type='button'>
              Forgot Password?
            </Button>
            <Button
              type='submit'
              className='bg-primary w-full text-white text-xl px-4 py-2 rounded'
            >
              Log in
            </Button>
          </form>
        </div>

        <div className='flex items-center justify-between'>
          <div className='border border-secondary h-0 w-1/2' />
          <div className='mx-3 text-secondary'>or</div>
          <div className='border border-secondary  h-0 w-1/2' />
        </div>
        <Button
          variant='outline'
          className='text-xl flex justify-start'
          type='button'
        >
          <Image src={GoogleIcon} alt='Google-Icon' />
          <div className='w-full'>Continue with Google</div>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
export default Login
