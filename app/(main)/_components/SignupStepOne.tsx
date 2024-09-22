import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import GoogleIcon from '@/public/google-icon.svg'
import React, { Dispatch, SetStateAction, useState } from 'react'
import SignupStepTwo from './SignupStepTwo'
import { googleSignUp } from '@/actions/auth'
import useEmailValidation from '@/hooks/useEmailValidation'
import { toast } from '@/components/ui/use-toast'
import { SIGN_UP } from '@/utils/constanta'

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type FormData = z.infer<typeof signUpSchema>

const SignupStepOne: React.FC<{
  isSignup: boolean
  setIsSignup: Dispatch<SetStateAction<boolean>>
  setRegister: () => void
}> = ({ isSignup, setIsSignup, setRegister }) => {
  const { handleEmailValidation, loading, error } = useEmailValidation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
    const result = await handleEmailValidation(data.email)
    if (!result?.success) {
      toast({
        variant: 'destructive',
        description: result?.data,
      })
      return
    }
    sessionStorage.setItem(SIGN_UP, JSON.stringify(data))
    reset()
    setRegister()
  }

  const googleSignup = async () => {
    try {
      await googleSignUp().catch(() => {
        toast({
          title: 'Signup failed',
          variant: 'destructive',
          description: 'Please try again',
        })
      })
      toast({
        description: 'Signup success',
      })
    } catch (error) {
      toast({
        title: 'Signup failed',
        variant: 'destructive',
        description: 'Please try again',
      })
      console.log('Signup google error: ', error)
    }
  }

  return (
    <Dialog open={isSignup} onOpenChange={setIsSignup}>
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

            <Button
              type='submit'
              className='bg-primary w-full text-white text-xl px-4 py-2 rounded'
              disabled={loading}
            >
              {loading ? 'loading...' : 'Continue'}
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
          onClick={googleSignup}
        >
          <Image src={GoogleIcon} alt='Google-Icon' />
          <div className='w-full'>Continue with Google</div>
        </Button>
      </DialogContent>
    </Dialog>
  )
}
export default SignupStepOne
