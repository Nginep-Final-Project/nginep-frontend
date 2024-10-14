import { logOutAuth } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { toast } from '@/components/ui/use-toast'
import useAccountVerification from '@/hooks/useAccountVerification'
import useEmailVerification from '@/hooks/useEmailVerification'
import useLogout from '@/hooks/useLogout'
import useProfile from '@/hooks/useProfile'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { BadgeCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'

const ProfileEmailVerification: React.FC<{
  isEmailVerification: boolean
  setIsEmailVerification: Dispatch<SetStateAction<boolean>>
  email: string
  name: string
}> = ({ isEmailVerification, setIsEmailVerification, email, name }) => {
  const [otp, setOtp] = useState<string>('')
  const { handleAccountVerification, loading } = useAccountVerification()
  const { handleUpdateEmail, loading: loadingUpdateEmail } = useProfile()
  const { handleEmailVerification, loading: loadingResend } =
    useEmailVerification()
  const { handleLogOut } = useLogout()
  const router = useRouter()

  const handleResend = async () => {
    const request = {
      email: email,
      name: name,
    }
    const result = await handleEmailVerification(request)
    if (!result?.success) {
      toast({
        variant: 'destructive',
        description: result?.data,
      })
      return
    }
    toast({
      description: (
        <div className='flex gap-x-1'>
          <BadgeCheck color='#00BA88' strokeWidth={3} />
          Success: We sent you a verification code by Email
        </div>
      ),
    })
  }

  const logOut = async () => {
    const result = await handleLogOut()
    if (!result?.success) {
      toast({
        title: 'Login failed',
        variant: 'destructive',
        description: result?.message,
      })
      return
    }
    logOutAuth()
      .then(() => {
        toast({
          title: result?.message,
        })
      })
      .catch((error) => {
        toast({
          title: 'Login failed',
          variant: 'destructive',
          description: error,
        })
      })
    router.push('/')
  }

  return (
    <Dialog open={isEmailVerification} onOpenChange={setIsEmailVerification}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-xl text-center'>
            Confirm Email
          </DialogTitle>
        </DialogHeader>

        <div className='border-t border-secondary py-4'>
          <p className='mb-4 font-medium '>Enter your verification code</p>
          <p className='mb-4'>Enter the code we emailed to {email}.</p>
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={otp}
            onChange={async (value) => {
              setOtp(value)
              if (value.length === 6) {
                const request = {
                  email: email,
                  code: value,
                }
                const result = await handleAccountVerification(request)
                if (!result?.success) {
                  toast({
                    variant: 'destructive',
                    description: result?.data,
                  })
                  return
                }
                const resultUpdateEmail = await handleUpdateEmail({
                  email: email,
                })
                if (!resultUpdateEmail?.success) {
                  toast({
                    variant: 'destructive',
                    description: resultUpdateEmail?.message,
                  })
                  return
                }

                toast({
                  description: (
                    <div className='flex gap-x-1'>
                      <BadgeCheck color='#00BA88' strokeWidth={3} />
                      {resultUpdateEmail.message}
                    </div>
                  ),
                })
                setOtp('')
                setIsEmailVerification(false)
                logOut()
              }
            }}
            disabled={loading || loadingUpdateEmail}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={4} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <div className='text-sm'>
            Didn&apos;t get an email?{' '}
            <Button
              variant='link'
              className='p-0'
              type='button'
              onClick={handleResend}
              disabled={loadingResend}
            >
              {loadingResend ? 'Loading...' : ' Try again'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default ProfileEmailVerification
