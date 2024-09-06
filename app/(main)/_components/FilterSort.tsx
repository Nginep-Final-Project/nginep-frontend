'use client'
import { propertyCategories, propertyLocation } from '@/utils/dummy'
import CategoryCarousel from './CategoryCarousel'
import { useState } from 'react'
import Select from '@/components/Select'
import DatePicker from '@/components/DatePicker'
import { DateRange } from 'react-day-picker'
import GuestDialog from './GuestDialog'
import { Button } from '@/components/ui/button'
import {
  ArrowDownAZ,
  ArrowUpZA,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'

const FilterSort = () => {
  const [category, setCategory] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [dateRange, setdateRange] = useState<DateRange>()
  const [guest, setGuest] = useState<number>(1)
  const [price, setPrice] = useState<string>('')
  const [sortName, setSortName] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleGuestChange = (value: number) => {
    setGuest(value)
    setIsDialogOpen(false)
  }

  const handleSubmit = () => {
    const data = {
      category: category,
      location: location,
      dateRange: dateRange,
      guest: guest,
      price: price,
      sortName: sortName,
    }
    console.log(data)
  }

  return (
    <div className='w-full space-y-4 my-4'>
      <div className='px-4 md:px-16'>
        <CategoryCarousel
          categories={propertyCategories}
          setCtg={setCategory}
        />
      </div>

      <div className={`grid md:grid-cols-6 gap-5 px-4 lg:px-11`}>
        <Select
          options={propertyLocation}
          placeholder='Select destination'
          onSelect={(selectedValue) => {
            if (typeof selectedValue === 'string') {
              setLocation(selectedValue)
            }
          }}
        />
        <DatePicker
          value={dateRange as DateRange}
          onChange={(value) => setdateRange(value)}
          placeholder='Select date'
        />
        <Button
          variant='outline'
          onClick={() => setIsDialogOpen(true)}
          className='gap-x-4 justify-between'
        >
          {`${guest} Guests`} <Users size={20} />
        </Button>
        <Button
          variant='outline'
          type='button'
          className={`gap-x-4 justify-between ${
            price !== '' && 'border-2 border-primary'
          }`}
          onClick={() => {
            if (price === '') setPrice('asc')
            if (price === 'asc') setPrice('desc')
            if (price === 'desc') setPrice('')
          }}
        >
          Price
          {price === 'asc' || price === '' ? <TrendingDown /> : <TrendingUp />}
        </Button>
        <Button
          variant='outline'
          type='button'
          className={`gap-x-4 justify-between ${
            sortName !== '' && 'border-2 border-primary'
          }`}
          onClick={() => {
            if (sortName === '') setSortName('asc')
            if (sortName === 'asc') setSortName('desc')
            if (sortName === 'desc') setSortName('')
          }}
        >
          Name
          {sortName === 'asc' || sortName === '' ? (
            <ArrowDownAZ />
          ) : (
            <ArrowUpZA />
          )}
        </Button>
        <Button type='button' onClick={handleSubmit}>
          Submit
        </Button>
        <GuestDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onChange={handleGuestChange}
        />
      </div>
    </div>
  )
}
export default FilterSort
