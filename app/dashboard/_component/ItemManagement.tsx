'use client'
import Input from '@/components/Input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z, ZodSchema } from 'zod'
import Delete from '@/public/delete.svg'
import Edit from '@/public/pencil.svg'
import { useToast } from '@/components/ui/use-toast'

interface Item {
  id: number
  name: string
}

interface ItemManagementProps<T extends ZodSchema> {
  schema: T
  itemName: string
  label: string
  placeholder: string
}

const ItemManagement = <T extends ZodSchema>({
  schema,
  itemName,
  label,
  placeholder,
}: ItemManagementProps<T>) => {
  const [items, setItems] = useState<Item[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [currentItemId, setCurrentItemId] = useState<number | null>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<{ name: string }>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: { name: string }) => {
    const itemExists = items.some(
      (i) => i.name.toLowerCase() === data.name.toLowerCase()
    )

    if (itemExists) {
      toast({
        variant: 'destructive',
        description: `${itemName} already exists!`,
      })
      return
    }

    if (isEditing && currentItemId !== null) {
      // Edit existing item
      const updatedItems = items.map((i) =>
        i.id === currentItemId ? { ...i, name: data.name } : i
      )
      setItems(updatedItems)
      setIsEditing(false)
      setCurrentItemId(null)
    } else {
      // Add new item
      const newItem: Item = {
        id: items.length > 0 ? items[items.length - 1].id + 1 : 0,
        name: data.name,
      }
      setItems([...items, newItem])
    }
    reset()
  }

  const handleEdit = (id: number) => {
    const itemToEdit = items.find((i) => i.id === id)
    if (itemToEdit) {
      setValue('name', itemToEdit.name)
      setIsEditing(true)
      setCurrentItemId(id)
    }
  }

  const handleDelete = (id: number) => {
    const updatedItems = items.filter((i) => i.id !== id)
    setItems(updatedItems)
  }

  return (
    <div className='flex flex-col items-center py-4 md:py-32'>
      <div className='w-1/2'>
        <h2 className='font-semibold text-2xl mb-4 text-center'>
          {itemName} Management
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name='name'
            label={label}
            type='text'
            register={register}
            errors={errors}
          />

          <div className='flex justify-end space-x-4 w-full'>
            <Button
              variant='cancel'
              className='p-3 rounded-2xl font-semibold text-xl'
              type='button'
              onClick={() => {
                reset()
                setIsEditing(false)
                setCurrentItemId(null)
              }}
            >
              Cancel
            </Button>

            <Button
              type='submit'
              className='text-white p-3 rounded-2xl font-semibold text-xl'
            >
              {isEditing ? 'Update' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
      <div className='w-1/2 mt-8'>
        <h2 className='font-semibold text-2xl mb-4 text-center'>
          {itemName} List
        </h2>
        <div className='flex flex-wrap gap-3'>
          {items.map((e) => {
            return (
              <Button
                key={e.id}
                variant='outline'
                className='flex gap-3'
                type='button'
              >
                {e.name}
                <Image
                  src={Delete}
                  alt='delete'
                  onClick={() => handleDelete(e.id)}
                />
                <Image src={Edit} alt='edit' onClick={() => handleEdit(e.id)} />
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ItemManagement
