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
import Select from '@/components/Select'
import { incrementType } from '@/utils/dummy'

const PeakSeasonRateSchema = z.object({
  incrementType: z.string({
    required_error: 'Increment type is required',
  }),
  amount: z.number().min(0, 'Price must be a positive number'),
})

export type PeakSeasonRateFormValues = z.infer<typeof PeakSeasonRateSchema>

interface PeakSeasonRateProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (room: PeakSeasonRateFormValues) => void
}

const PeakSeasonRate: React.FC<PeakSeasonRateProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  const form = useForm<PeakSeasonRateFormValues>({
    resolver: zodResolver(PeakSeasonRateSchema),
  })

  const onSubmit = (data: PeakSeasonRateFormValues) => {
    onSave(data)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle>Peak Season Rate</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='incrementType'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* <Input
                      type='number'
                      placeholder='Peak season rate'
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    /> */}
                    <Select
                      options={incrementType}
                      placeholder='Select increment type'
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Total amount for increment'
                      {...field}
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
export default PeakSeasonRate
