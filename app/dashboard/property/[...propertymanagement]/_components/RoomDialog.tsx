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
import useUploadImage from '@/hooks/useUploadImage'
import DatePeakSeasonPicker from './DatePeakSeasonPicker'
import { NotAvailableDates } from '@/types/createProperty'
import usePropertyRoom from '@/hooks/usePropertyRoom'

export type RoomFormValues = z.infer<typeof createRoomSchema>

interface RoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (room: RoomFormValues) => void
  initialRoom: RoomFormValues | null
  isEditingMode?: boolean
  propertyId?: number
}

const RoomDialog: React.FC<RoomDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  initialRoom,
  isEditingMode = false,
  propertyId,
}) => {
  const { handleUploadImage, handleUpdateImage, loading } = useUploadImage()
  const {
    handleCreatePropertyRoom,
    handleUpdatePropertyRoom,
    loading: loadingPropertyRoom,
  } = usePropertyRoom()
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      id: undefined,
      notAvailableDates: [],
    },
  })

  const onCancel = () => {
    form.reset({
      id: undefined,
      name: '',
      description: '',
      maxGuests: 1,
      basePrice: 1,
      totalRoom: 1,
      notAvailableDates: [],
    })
  }

  useEffect(() => {
    if (initialRoom) {
      form.reset(initialRoom)
    } else {
      onCancel()
    }
  }, [initialRoom, form])

  const onSubmit = async (data: RoomFormValues) => {
    console.log(data)
    if (isEditingMode && initialRoom) {
      console.log('edit exists room')
      const result = await handleUpdatePropertyRoom({
        id: data.id!,
        name: data.name,
        roomPicture: data.roomPicture,
        roomPictureId: data.roomPictureId!,
        description: data.description,
        maxGuests: data.maxGuests,
        basePrice: data.basePrice,
        totalRoom: data.totalRoom,
      })
      if (result?.success) {
        onSave(data)
        form.reset()
      }

      return
    }
    if (isEditingMode) {
      console.log('add room when edit')
      const result = await handleCreatePropertyRoom({
        name: data.name,
        roomPicture: data.roomPicture,
        roomPictureId: data.roomPictureId!,
        description: data.description,
        maxGuests: data.maxGuests,
        basePrice: data.basePrice,
        totalRoom: data.totalRoom,
        notAvailableDates: data.notAvailableDates!,
        propertyId: propertyId!,
      })
      if (result?.success) {
        onSave(data)
        form.reset()
      }
      return
    }
    onSave(data)
    form.reset()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onCancel()
        onOpenChange(false)
      }}
    >
      <DialogContent className='sm:max-w-[425px] bg-white overflow-y-auto max-h-screen'>
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
              name='totalRoom'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Room</FormLabel>
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
              name='roomPicture'
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Room Image</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept={ACCEPTED_IMAGE_TYPES.join(',')}
                      placeholder={initialRoom?.roomPicture ?? 'Room Image'}
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          let uploadImage
                          if (isEditingMode === true && initialRoom) {
                            uploadImage = await handleUpdateImage(
                              file,
                              form.watch('roomPictureId')!
                            )
                          } else {
                            uploadImage = await handleUploadImage(file)
                          }
                          onChange(uploadImage?.data.url)
                          form.setValue(
                            'roomPictureId',
                            uploadImage?.data.publicId
                          )
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
              name='notAvailableDates'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Not Available Date</FormLabel>
                  <FormControl>
                    <DatePeakSeasonPicker
                      value={field.value as NotAvailableDates[]}
                      onChange={(newValue) => field.onChange(newValue)}
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
                onClick={() => {
                  onCancel()
                  onOpenChange(false)
                }}
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
