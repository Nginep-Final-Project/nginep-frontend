import React from 'react'
import {
  FieldValues,
  RegisterOptions,
  useForm,
  UseFormRegisterReturn,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Input from '@/components/Input'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from '@/components/ui/form'

const roomSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Room name is required'),
  description: z.string().min(1, 'Room description is required'),
  guests: z
    .string()
    .min(1, 'At least 1 guest is required')
    .max(10, 'Maximum 10 guests allowed'),
  price: z.string().min(0, 'Price must be a positive number'),
})

export type RoomFormValues = z.infer<typeof roomSchema>

interface RoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (room: RoomFormValues) => void
  initialRoom?: RoomFormValues
}

const RoomDialog: React.FC<RoomDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  initialRoom,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: initialRoom || {
      name: '',
      description: '',
      guests: '1',
      price: '0',
    },
  })

  const onSubmit = (data: RoomFormValues) => {
    onSave(data)
    onOpenChange(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle>{initialRoom ? 'Edit Room' : 'Add Room'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* <FormField
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
          /> */}
          <Input
            name='name'
            label='Room name'
            type='text'
            register={register}
            errors={errors}
          />

          {/* <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder='Room description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Input
            name='description'
            label='Room description'
            type='textarea'
            register={register}
            errors={errors}
          />
          {/* <FormField
            control={form.control}
            name='guests'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Room guests'
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Input
            name='guests'
            label='Room guests'
            type='number'
            register={register}
            errors={errors}
          />
          {/* <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Room price'
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Input
            name='price'
            label='Room price'
            type='number'
            register={register}
            errors={errors}
          />
          <div className='flex justify-end space-x-2'>
            <Button
              variant='cancel'
              type='button'
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RoomDialog
