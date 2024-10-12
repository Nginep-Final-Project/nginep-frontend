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

export interface Item {
  id: number
  value: string
  label: string
}

interface ItemManagementProps<T extends ZodSchema> {
  schema: T
  itemName: string
  label: string
  items: Item[]
  onAdd: (newValue: string) => void
  onEdit: (id: number, newValue: string) => void
  onDelete: (id: number) => void
}

const ItemManagement = <T extends ZodSchema>({
  schema,
  itemName,
  label,
  items,
  onAdd,
  onEdit,
  onDelete,
}: ItemManagementProps<T>) => {
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
      (i) => i.label.toLowerCase() === data.name.toLowerCase()
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
      onEdit(currentItemId, data.name)
      setIsEditing(false)
      setCurrentItemId(null)
    } else {
      // Add new item
      onAdd(data.name)
    }
    reset()
  }

  const handleEdit = (id: number) => {
    const itemToEdit = items.find((i) => i.id === id)
    if (itemToEdit) {
      setValue('name', itemToEdit.label)
      setIsEditing(true)
      setCurrentItemId(id)
    }
  }

  return (
    <div className='flex flex-col items-center py-4 md:py-32'>
      <div className='md:w-1/2'>
        <h2 className='font-semibold md:text-2xl mb-4 text-center'>
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
              className='p-3 rounded-2xl font-semibold md:text-xl'
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
              className='text-white p-3 rounded-2xl font-semibold md:text-xl'
            >
              {isEditing ? 'Update' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
      <div className='md:w-1/2 mt-8'>
        <h2 className='font-semibold md:text-2xl mb-4 text-center'>
          {itemName} List
        </h2>
        <div className='flex flex-wrap gap-3 px-4 md:px-0'>
          {items.length === 0 ? (
            <p className='text-sm text-center w-full'>
              No {itemName}? No Problem! (But Maybe Add One?)
            </p>
          ) : (
            items.map((e) => {
              return (
                <Button
                  key={e.id}
                  variant='outline'
                  className='flex gap-3'
                  type='button'
                >
                  {e.label}
                  <Image
                    src={Delete}
                    alt='delete'
                    onClick={() => onDelete(e.id)}
                  />
                  <Image
                    src={Edit}
                    alt='edit'
                    onClick={() => handleEdit(e.id)}
                  />
                </Button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemManagement
