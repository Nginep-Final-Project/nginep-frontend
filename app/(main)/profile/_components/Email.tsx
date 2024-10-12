'use client'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Check from '@/public/Check.svg'
import { ShieldAlert } from 'lucide-react'
import EmailVerification from '../../_components/EmailVerification'
import useEmailVerification from '@/hooks/useEmailVerification'
import { toast } from '@/components/ui/use-toast'
import ProfileEmailVerification from './ProfileEmailVerification'

interface EmailProps {
  initialEmail: string
  isVerified: boolean
  name: string
}

const EmailSchema = z.object({
  email: z.string().email('Invalid email address'),
})
type FormData = z.infer<typeof EmailSchema>

const Email: React.FC<EmailProps> = ({ initialEmail, isVerified, name }) => {
  const { handleEmailVerification, loading } = useEmailVerification()
  const [isEmailVerification, setIsEmailVerification] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  })

  useEffect(() => {
    setValue('email', initialEmail)
  }, [initialEmail, setValue])

  const onSubmit = async (data: FormData) => {
    if (data.email === initialEmail) {
      return
    }

    const request = {
      email: data.email,
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
    setIsEmailVerification(true)
  }

  const handleVerify = async () => {
    const request = {
      email: watch('email'),
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
    setIsEmailVerification(true)
  }

  return (
    <div>
      <Card className='border-secondary'>
        <CardHeader className='border-b border-secondary p-4'>
          <CardTitle className='text-base md:text-xl'>Email</CardTitle>
        </CardHeader>
        <CardContent className='py-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid w-full'>
              {!isVerified ? (
                <Button
                  variant='link'
                  type='button'
                  className='px-0 justify-start gap-x-2'
                  onClick={handleVerify}
                >
                  Your email need to verify
                  <ShieldAlert color='#ed2e2e' />
                </Button>
              ) : (
                <p className='flex gap-x-2'>
                  Your email is verified <Image src={Check} alt='verified' />
                </p>
              )}
              <Input
                name='email'
                label=''
                type='email'
                register={register}
                errors={errors}
              />
            </div>
            <div className='flex gap-x-4 justify-end'>
              <Button variant='cancel' type='button'>
                Cancel
              </Button>
              <Button type='submit' disabled={loading}>
                {loading ? 'Loading...' : 'Save'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <ProfileEmailVerification
        isEmailVerification={isEmailVerification}
        setIsEmailVerification={setIsEmailVerification}
        email={watch('email')}
        name={name}
      />
    </div>
  )
}
export default Email
