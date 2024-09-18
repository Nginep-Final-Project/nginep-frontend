'use client'

import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Delete from '@/public/delete.svg'
import useLanguage from '@/hooks/useLanguage'

interface Item {
  id: number
  languageName: string
}

interface LanguagesProps {
  props: Item[]
  userId: number
}

const LanguageSchema = z.object({
  language: z.string({ required_error: 'Languge is required' }),
})
type FormData = z.infer<typeof LanguageSchema>

const Languages: React.FC<LanguagesProps> = ({ props, userId }) => {
  const [items, setItems] = useState<Item[]>([])
  const { handleAddLanguage, handleDeleteLanguage, loading } = useLanguage()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(LanguageSchema),
  })

  useEffect(() => {
    setItems(props)
  }, [props])

  const onSubmit = async (data: FormData) => {
    const itemExists = items.some(
      (i) => i.languageName.toLowerCase() === data.language.toLowerCase()
    )

    if (itemExists) {
      toast({
        variant: 'destructive',
        description: `${data.language} already exists!`,
      })
      return
    }

    const request = {
      languageName: data.language,
      tenantId: userId,
    }
    const result = await handleAddLanguage(request)
    if (!result?.success) {
      toast({
        variant: 'destructive',
        description: result?.data,
      })
      return
    } else {
      setItems((prevItems) => [...prevItems, result.data])
    }
    reset()
    toast({
      description: result?.message,
    })
  }

  const onCancel = () => {
    reset()
  }

  const handleDelete = async (id: number) => {
    const result = await handleDeleteLanguage(id)
    if (!result?.success) {
      toast({
        variant: 'destructive',
        description: result?.data,
      })
      return
    }
    const updatedItems = items.filter((i) => i.id !== id)
    setItems(updatedItems)
    toast({
      description: result?.data,
    })
  }

  return (
    <Card className='border-secondary'>
      <CardHeader className='border-b border-secondary p-4'>
        <CardTitle className='text-base md:text-xl'>Language</CardTitle>
      </CardHeader>
      <CardContent className='py-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid w-full'>
            <Input
              name='language'
              label='Add the language you are fluent in'
              type='text'
              register={register}
              errors={errors}
            />
          </div>
          <div className='flex gap-x-4 justify-end'>
            <Button variant='cancel' type='button' onClick={onCancel}>
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </form>

        <div className='flex flex-wrap justify-start gap-3 mt-4'>
          {items.length === 0 ? (
            <p className='text-sm text-start w-full'>
              No languages? No Problem! (But Maybe Add One?)
            </p>
          ) : (
            items.map((e) => {
              return (
                <Button
                  key={e.languageName}
                  variant='outline'
                  className='flex gap-3'
                  type='button'
                >
                  {e.languageName}
                  <Image
                    src={Delete}
                    alt='delete'
                    onClick={() => handleDelete(e.id)}
                  />
                </Button>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
export default Languages
