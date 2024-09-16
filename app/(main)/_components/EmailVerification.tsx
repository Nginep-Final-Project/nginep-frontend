import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useToast } from '@/components/ui/use-toast'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BadgeCheck } from 'lucide-react'
import { SIGN_UP } from '@/utils/constanta'
import useAccountVerification from '@/hooks/useAccountVerification'
import useSignup from '@/hooks/useSignup'

interface signUp {
  dateOfBirth: string
  email: string
  fullName: string
  password: string
  role: string
}

const EmailVerification: React.FC<{
  isEmailVerification: boolean
  setIsEmailVerification: Dispatch<SetStateAction<boolean>>
}> = ({ isEmailVerification, setIsEmailVerification }) => {
  const { handleAccountVerification, loading, error } = useAccountVerification()
  const {
    handleSignup,
    loading: loadingSignUp,
    error: errorSignUp,
  } = useSignup()
  const [otp, setOtp] = useState<string>('')
  const [signUpData, setSignUpData] = useState<signUp>({
    dateOfBirth: '',
    email: '',
    fullName: '',
    password: '',
    role: '',
  })
  const { toast } = useToast()

  useEffect(() => {
    const storedData = sessionStorage.getItem(SIGN_UP)
    if (storedData) {
      const parseStoredData = JSON.parse(storedData)
      console.log(parseStoredData)
      setSignUpData(parseStoredData)
    }
  }, [isEmailVerification])

  return (
    <Dialog open={isEmailVerification} onOpenChange={setIsEmailVerification}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-xl text-center'>
            Confirm account
          </DialogTitle>
        </DialogHeader>

        <div className='border-t border-secondary py-4'>
          <p className='mb-4 font-medium '>Enter your verification code</p>
          <p className='mb-4'>
            Enter the code we emailed to {signUpData.email}.
          </p>
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={otp}
            onChange={async (value) => {
              setOtp(value)
              if (value.length === 6) {
                const request = {
                  email: signUpData.email,
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
                const resultSignUp = await handleSignup(signUpData)
                if (!resultSignUp?.success) {
                  toast({
                    variant: 'destructive',
                    description: resultSignUp?.message,
                  })
                  return
                }
                setOtp('')
                setIsEmailVerification(false)
                toast({
                  description: (
                    <div className='flex gap-x-1'>
                      <BadgeCheck color='#00BA88' strokeWidth={3} />
                      {resultSignUp.message}
                    </div>
                  ),
                })
              }
            }}
            disabled={loading || loadingSignUp}
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
              onClick={() => {
                toast({
                  description: (
                    <div className='flex gap-x-1'>
                      <BadgeCheck color='#00BA88' strokeWidth={3} />
                      Success: We sent you a verification code by Email
                    </div>
                  ),
                })
              }}
            >
              Try again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EmailVerification
