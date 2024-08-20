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
import React, { Dispatch, SetStateAction } from 'react'
import { SquareUserRound } from 'lucide-react'
import { HousePlus } from 'lucide-react'

const signUpSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  dateOfBirth: z.string().date(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['User', 'Tenant']),
})

type FormData = z.infer<typeof signUpSchema>

const SignupStepTwo: React.FC<{
  isSignupStepTwo: boolean
  setIsSignupStepTwo: Dispatch<SetStateAction<boolean>>
  setEmailVerification: () => void
}> = ({ isSignupStepTwo, setIsSignupStepTwo, setEmailVerification }) => {
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
      role: 'User',
    },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
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
                    watch('role') === 'User'
                      ? 'border-primary border-2'
                      : 'border-secondary'
                  }`}
                  onClick={() => setValue('role', 'User')}
                >
                  <SquareUserRound />
                  User
                </Button>
                <Button
                  variant='outline'
                  type='button'
                  className={`flex flex-col items-center h-fit w-1/3 ${
                    watch('role') === 'Tenant'
                      ? 'border-primary border-2'
                      : 'border-secondary'
                  }`}
                  onClick={() => setValue('role', 'Tenant')}
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
              By selecting Agree and continue, I agree to Nginep’s Terms of
              Service, Payments Terms of Service, and Nondiscrimination Policy
              and acknowledge the Privacy Policy.
            </p>

            <Button
              type='submit'
              className='bg-primary w-full text-white text-xl px-4 py-2 rounded'
            >
              Agree and continue
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default SignupStepTwo
