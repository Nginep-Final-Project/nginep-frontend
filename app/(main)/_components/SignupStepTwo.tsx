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
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { SquareUserRound } from 'lucide-react'
import { HousePlus } from 'lucide-react'
import { SIGN_UP } from '@/utils/constanta'
import useEmailVerification from '@/hooks/useEmailVerification'
import { toast } from '@/components/ui/use-toast'

const signUpSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  dateOfBirth: z.string().date(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['guest', 'tenant']),
})

type FormData = z.infer<typeof signUpSchema>

const SignupStepTwo: React.FC<{
  isSignupStepTwo: boolean
  setIsSignupStepTwo: Dispatch<SetStateAction<boolean>>
  setEmailVerification: () => void
}> = ({ isSignupStepTwo, setIsSignupStepTwo, setEmailVerification }) => {
  const { handleEmailVerification, loading, error } = useEmailVerification()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: 'guest',
    },
  })

  useEffect(() => {
    const storedData = sessionStorage.getItem(SIGN_UP)
    if (storedData) {
      const parseStoredData = JSON.parse(storedData)
      console.log(parseStoredData)
      setValue('email', parseStoredData.email)
    }
  }, [isSignupStepTwo, setValue])

  const onSubmit = async (data: FormData) => {
    console.log(data)
    const request = {
      email: data.email,
      name: data.fullName,
    }
    const result = await handleEmailVerification(request)
    if (!result?.success) {
      toast({
        variant: 'destructive',
        description: result?.data,
      })
      return
    }
    sessionStorage.setItem(SIGN_UP, JSON.stringify(data))
    reset()
    setEmailVerification()
  }
  return (
    <Dialog open={isSignupStepTwo} onOpenChange={setIsSignupStepTwo}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-xl text-center'>
            Finish signing up
          </DialogTitle>
        </DialogHeader>
        <div className='border-t border-secondary py-4'>
          <h2 className='font-semibold text-2xl mb-4'>Welcome to Nginep</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name='fullName'
              label='Full name'
              type='text'
              register={register}
              errors={errors}
            />
            <Input
              name='dateOfBirth'
              label='Date of birth'
              type='date'
              register={register}
              errors={errors}
            />
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

            <div>
              <h2 className='text-sm font-medium'>Role</h2>
              <div className='flex justify-around mt-1 mb-4'>
                <Button
                  variant='outline'
                  type='button'
                  className={`flex flex-col items-center h-fit w-1/3 ${
                    watch('role') === 'guest'
                      ? 'border-primary border-2'
                      : 'border-secondary'
                  }`}
                  onClick={() => setValue('role', 'guest')}
                >
                  <SquareUserRound />
                  Guest
                </Button>
                <Button
                  variant='outline'
                  type='button'
                  className={`flex flex-col items-center h-fit w-1/3 ${
                    watch('role') === 'tenant'
                      ? 'border-primary border-2'
                      : 'border-secondary'
                  }`}
                  onClick={() => setValue('role', 'tenant')}
                >
                  <HousePlus />
                  Tenant
                </Button>
              </div>
              {errors['role'] && (
                <p className='mt-2 text-sm text-error'>
                  {errors['role']?.message as string}
                </p>
              )}
            </div>

            <p className='text-xs mb-4'>
              By selecting Agree and continue, I agree to Nginep&apos;s Terms of
              Service, Payments Terms of Service, and Nondiscrimination Policy
              and acknowledge the Privacy Policy.
            </p>

            <Button
              type='submit'
              className='bg-primary w-full text-white text-xl px-4 py-2 rounded'
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Agree and continue'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default SignupStepTwo
