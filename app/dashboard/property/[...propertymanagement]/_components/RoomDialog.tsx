import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

const roomSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Room name is required'),
  description: z.string().min(1, 'Room description is required'),
  guests: z
    .number()
    .min(1, 'At least 1 guest is required')
    .max(10, 'Maximum 10 guests allowed'),
  price: z.number().min(0, 'Price must be a positive number'),
})

export type RoomFormValues = z.infer<typeof roomSchema>

interface RoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (room: RoomFormValues) => void
  initialRoom: RoomFormValues | null
}

const RoomDialog: React.FC<RoomDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  initialRoom,
}) => {
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: '',
      description: '',
      guests: 1,
      price: 0,
    },
  })

  useEffect(() => {
    if (initialRoom) {
      form.reset(initialRoom)
    } else {
      form.reset({
        name: '',
        description: '',
        guests: 1,
      })
    }
  }, [initialRoom, form])

  const onSubmit = (data: RoomFormValues) => {
    onSave(data)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle>{initialRoom ? 'Edit Room' : 'Add Room'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Room name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Room description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='guests'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Number of guests'
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Room price'
                      {...field}
                      value={field.value || 0}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end space-x-2'>
              <Button
                variant='outline'
                type='button'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default RoomDialog
