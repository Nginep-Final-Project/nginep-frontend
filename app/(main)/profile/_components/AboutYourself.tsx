'use client'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import useProfile from '@/hooks/useProfile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface AboutYourselfProps {
  initialValue: string
}

const AboutYourselfSchema = z.object({
  value: z.string().min(20, 'Describe yourself at least have 20 characters'),
})
type FormData = z.infer<typeof AboutYourselfSchema>

const AboutYourself: React.FC<AboutYourselfProps> = ({ initialValue }) => {
  const { handleUpdateAboutYourself, loading } = useProfile()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(AboutYourselfSchema),
    defaultValues: {
      value: '',
    },
  })

  useEffect(() => {
    reset({ value: initialValue })
  }, [initialValue, reset])

  const onSubmit = async (data: FormData) => {
    const request = {
      aboutYourself: data.value,
    }
    const result = await handleUpdateAboutYourself(request)
    if (!result?.success) {
      toast({
        variant: 'destructive',
        description: result?.data,
      })
      return
    }
    toast({
      description: result.data,
    })
  }

  const onCancel = () => {
    reset({ value: initialValue })
  }

  return (
    <Card className='border-secondary'>
      <CardHeader className='border-b border-secondary p-4'>
        <CardTitle className='text-base md:text-xl'>
          Tell us about yourself
        </CardTitle>
      </CardHeader>
      <CardContent className='py-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid w-full'>
            <Input
              name='value'
              label='Describe about yourself for your future renter'
              type='textarea'
              register={register}
              errors={errors}
            />
          </div>
          <div className='flex gap-x-4 justify-end'>
            <Button variant='cancel' type='button' onClick={onCancel}>
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? 'loading...' : 'Save'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
export default AboutYourself
