import React from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

type CalendarSingleProps = {
  mode: 'single'
  value: Date | undefined
  onChange: (value: Date | undefined) => void
}

type CalendarRangeProps = {
  mode: 'range'
  value: DateRange | undefined
  onChange: (value: DateRange | undefined) => void
}

type CalendarProps = (CalendarSingleProps | CalendarRangeProps) & {
  placeholder?: string
  className?: string
}

const DatePicker: React.FC<CalendarProps> = (props) => {
  const {
    mode,
    value,
    onChange,
    placeholder = 'Pick a date',
    className,
  } = props

  const formatDate = (date: Date | DateRange | undefined) => {
    if (!date) return placeholder
    if (mode === 'single' && date instanceof Date) {
      return format(date, 'PP')
    }
    if (mode === 'range' && 'from' in date) {
      if (date.from) {
        if (date.to) {
          return `${format(date.from, 'PP')} - ${format(date.to, 'PP')}`
        }
        return `${format(date.from, 'PP')} - ...`
      }
    }
    return placeholder
  }

  const handleSelect = (newValue: Date | DateRange | undefined) => {
    if (mode === 'single' && newValue instanceof Date) {
      onChange(newValue)
    } else if (mode === 'range' && newValue && 'from' in newValue) {
      onChange(newValue)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full pl-3 text-left font-normal',
            !value && 'text-primary-text',
            className
          )}
        >
          <div className='w-3/4 line-clamp-2'>{formatDate(value)}</div>
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 bg-white' align='start'>
        {mode === 'single' ? (
          <Calendar
            mode='single'
            selected={value as Date | undefined}
            onSelect={onChange as (date: Date | undefined) => void}
            disabled={(date) => date < new Date()}
            initialFocus
          />
        ) : (
          <Calendar
            mode='range'
            selected={value as DateRange | undefined}
            onSelect={onChange as (range: DateRange | undefined) => void}
            disabled={(date) => date < new Date()}
            numberOfMonths={2}
            initialFocus
          />
        )}
        {/* <Calendar
          mode={mode}
          selected={value}
          onSelect={handleSelect}
          disabled={(date) => date < new Date()}
          numberOfMonths={mode === 'range' ? 2 : 1}
          initialFocus
        /> */}
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
