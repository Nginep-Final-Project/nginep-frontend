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
import Select from '@/components/Select'
import { incrementType } from '@/utils/dummy'
import { createPeakSeasonRates } from '@/utils/schema'
import DatePicker from '@/components/DatePicker'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'

export type PeakSeasonRateFormValues = z.infer<typeof createPeakSeasonRates>

interface PeakSeasonRateProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (room: PeakSeasonRateFormValues) => void
  initialPeakSeason: PeakSeasonRateFormValues | null
}

const PeakSeasonRate: React.FC<PeakSeasonRateProps> = ({
  open,
  onOpenChange,
  onSave,
  initialPeakSeason,
}) => {
  const form = useForm<PeakSeasonRateFormValues>({
    resolver: zodResolver(createPeakSeasonRates),
    defaultValues: {
      rateType: '',
      rateValue: 1,
    },
  })

  useEffect(() => {
    if (initialPeakSeason) {
      form.reset(initialPeakSeason)
    } else {
      form.reset({
        peakSeasonDates: { from: undefined, to: undefined },
        rateType: '',
        rateValue: 1,
      })
    }
  }, [initialPeakSeason, form])

  const onSubmit = (data: PeakSeasonRateFormValues) => {
    console.log(data)
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
              name='peakSeasonDates'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Peak Season Rate Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      mode='range'
                      value={field.value as DateRange}
                      onChange={(value) => {
                        field.onChange(value)
                        if (value?.from && value.to) {
                          form.setValue('peakSeasonDates', {
                            from: format(value?.from!, 'yyyy-MM-dd'),
                            to: format(value?.to!, 'yyyy-MM-dd'),
                          })
                        }
                      }}
                      placeholder='Select dates'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='rateType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Rate Type</FormLabel>
                  <FormControl>
                    <Select
                      options={incrementType}
                      placeholder='Select rate type'
                      onSelect={field.onChange}
                      initialValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='rateValue'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate Amount</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Rate amount for increment'
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
            <div className='flex justify-end space-x-2'>
              <Button
                variant='outline'
                type='button'
                onClick={() => {
                  onOpenChange(false)
                  form.reset()
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
export default PeakSeasonRate
