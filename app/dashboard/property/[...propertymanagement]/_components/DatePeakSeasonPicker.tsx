import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { NotAvailableDates } from '@/types/createProperty'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

interface DateRangeCalendarProps {
  value: NotAvailableDates[]
  onChange: (newValue: NotAvailableDates[]) => void
}

const DatePeakSeasonPicker: React.FC<DateRangeCalendarProps> = ({
  value,
  onChange,
}) => {
  const [currentRange, setCurrentRange] = useState<DateRange | undefined>()

  const handleSelect = (range: DateRange | undefined) => {
    setCurrentRange(range)
  }

  const handleAddRange = () => {
    if (currentRange?.from && currentRange?.to) {
      onChange([
        ...value,
        {
          from: format(currentRange.from, 'yyyy-MM-dd'),
          to: format(currentRange.to, 'yyyy-MM-dd'),
        },
      ])
      setCurrentRange(undefined)
    }
  }
  console.log('value', value)
  return (
    <div className='space-y-4'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className='w-full pl-3 text-left font-normal'
          >
            <div className='w-3/4 line-clamp-2'>Select Date Range</div>
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0 bg-white' align='start'>
          <Calendar
            mode='range'
            selected={currentRange}
            onSelect={handleSelect}
            className='rounded-md border'
            numberOfMonths={2}
            disabled={(date) => date < new Date()}
          />
          <Button
            onClick={handleAddRange}
            disabled={!currentRange?.from || !currentRange?.to}
          >
            Save
          </Button>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div>
          <h3 className='font-semibold'>Not Available Dates:</h3>
          <ul className='list-disc pl-5'>
            {value.map((range, index) => (
              <li key={index}>
                {format(range.from, 'yyyy-MM-dd')} -{' '}
                {format(range.to, 'yyyy-MM-dd')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default DatePeakSeasonPicker
