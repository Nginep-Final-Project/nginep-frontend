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
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ACCEPTED_IMAGE_TYPES, createRoomSchema } from '@/utils/schema'
import DatePicker from '@/components/DatePicker'
import { DateRange } from 'react-day-picker'
import useUploadImage from '@/hooks/useUploadImage'
import { toast } from '@/components/ui/use-toast'

export type RoomFormValues = z.infer<typeof createRoomSchema>

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
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
      maxGuests: 1,
      basePrice: '1',
      totalRoom: 1,
    },
  })

  useEffect(() => {
    if (initialRoom) {
      form.reset(initialRoom)
    } else {
      form.reset({
        name: '',
        description: '',
        maxGuests: 1,
        basePrice: '1',
        totalRoom: 1,
        notAvailabilityDates: {
          from: undefined,
          to: undefined,
        },
      })
    }
  }, [initialRoom, form])

  const onSubmit = async (data: RoomFormValues) => {
    console.log(data)
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
                  <FormLabel>Room Name or Type</FormLabel>
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
                  <FormLabel>Room Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Room description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='maxGuests'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Max Guests</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Number of guests'
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 1)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='basePrice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Price</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Room price'
                      {...field}
                      value={field.value || '1'}
                      onChange={(e) => field.onChange(e.target.value || '1')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='totalRoom'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Total Room</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Total room'
                      {...field}
                      value={field.value || 1}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 1)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='roomImage'
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Room Image</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept={ACCEPTED_IMAGE_TYPES.join(',')}
                      placeholder='Room Image'
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          onChange(file)
                        }
                      }}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='notAvailabilityDates'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Not Available Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      mode='range'
                      value={field.value as DateRange}
                      onChange={(value) => field.onChange(value)}
                      placeholder='Select dates'
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
