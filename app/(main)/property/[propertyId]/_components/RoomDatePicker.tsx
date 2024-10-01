import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import moment from 'moment'
import { format } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { PeakSeasonRate } from '@/types/property'

interface DateRangePickerProps {
  value: DateRange | undefined
  onChange?: (range: DateRange | undefined) => void
  peakSeasonRate: PeakSeasonRate[]
  basePrice: number
}

const RoomDatePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  peakSeasonRate = [],
  basePrice,
}) => {
  const generateDatePricing = (seasons: PeakSeasonRate[]) => {
    const datePricing: { [key: string]: number } = {}

    if (seasons && seasons.length > 0) {
      seasons.forEach((season) => {
        const currentDate = moment(season.peakSeasonDates.from)
        const endDate = moment(season.peakSeasonDates.to)

        while (currentDate.isSameOrBefore(endDate)) {
          let price: number

          if (season.rateType === 'PERCENTAGE') {
            price = basePrice + (basePrice * season.rateValue) / 100
          } else if (season.rateType === 'FIXED_AMOUNT') {
            price = basePrice + season.rateValue
          } else {
            price = basePrice
          }

          datePricing[currentDate.format('YYYY-MM-DD')] = price

          currentDate.add(1, 'day')
        }
      })
    }

    return datePricing
  }

  const renderDayContent = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd')
    const pricingData = generateDatePricing(peakSeasonRate)
    const price = pricingData[dateKey]
    return (
      <div className='flex flex-col items-center'>
        <div>{format(day, 'd')}</div>
        {day > new Date() &&
          (price !== undefined ? (
            <div className='text-xs bg-error bg-opacity-30 rounded-full'>
              {price.toFixed(0)}
            </div>
          ) : (
            <div className='text-xs '>{basePrice.toFixed(0)}</div>
          ))}
      </div>
    )
  }

  return (
    <div className='grid gap-2'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={`w-[300px] justify-start text-left font-normal`}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'LLL dd, y')} -{' '}
                  {format(value.to, 'LLL dd, y')}
                </>
              ) : (
                format(value.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0 bg-white' align='start'>
          <Calendar
            initialFocus
            mode='range'
            selected={value as DateRange | undefined}
            onSelect={onChange as (range: DateRange | undefined) => void}
            disabled={(date) => date < new Date()}
            numberOfMonths={2}
            modifiers={
              {
                // selected: (day) => {
                //   const dateKey = format(day, 'yyyy-MM-dd')
                //   return Boolean(pricingData[dateKey])
                // },
              }
            }
            // modifiersClassNames={{
            //   selected: 'bg-primary text-white',
            // }}
            components={{
              DayContent: ({ date: dayDate, ...props }) => (
                <div {...props}>{renderDayContent(dayDate)}</div>
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
export default RoomDatePicker
