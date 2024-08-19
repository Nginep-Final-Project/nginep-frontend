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
import { Dispatch, SetStateAction } from 'react'

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type FormData = z.infer<typeof forgotPasswordSchema>

const ForgotPassword: React.FC<{
  isForgotPassword: boolean
  setIsForgotPassword: Dispatch<SetStateAction<boolean>>
}> = ({ isForgotPassword, setIsForgotPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    reset()
    setIsForgotPassword(false)
  }
  return (
    <Dialog open={isForgotPassword} onOpenChange={setIsForgotPassword}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-xl text-center'>
            Forgot password?
          </DialogTitle>
        </DialogHeader>

        <div className='border-t border-secondary py-4'>
          <p className='mb-4'>
            Enter the email address associated with your account, and we’ll
            email you a link to reset your password.
          </p>
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
              className='bg-black w-full text-white text-xl px-4 py-2 rounded'
            >
              Send reset link
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default ForgotPassword
