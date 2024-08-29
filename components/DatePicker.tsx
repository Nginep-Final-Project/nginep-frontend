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

type CalenderProps = {
  value: DateRange
  onChange: (value: DateRange | undefined) => void
  placeholder?: string
  className?: string
}

const DatePicker: React.FC<CalenderProps> = ({
  value,
  onChange,
  placeholder = 'Pick a date',
  className,
}) => {
  const formatDateRange = (range: DateRange | undefined) => {
    if (!range) return placeholder
    if (range.from) {
      if (range.to) {
        return `${format(range.from, 'PPP')} - ${format(range.to, 'PPP')}`
      }
      return `${format(range.from, 'PPP')} - ...`
    }
    return placeholder
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full pl-3 text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
        >
          {formatDateRange(value)}
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 bg-white' align='start'>
        <Calendar
          mode='range'
          selected={value}
          onSelect={onChange}
          disabled={(date) => date < new Date()}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
