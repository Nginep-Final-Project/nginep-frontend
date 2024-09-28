'use client'
import { propertyCategories, propertyLocation } from '@/utils/dummy'
import CategoryCarousel from './CategoryCarousel'
import React, { useCallback, useEffect, useState } from 'react'
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
import { Category, City } from '@/types/property'
import { FilterRequest } from '../page'
import { addDays, format } from 'date-fns'

interface FilterSortProps {
  categories: Category[]
  cities: City[]
  onFilter: (req: FilterRequest) => void
}

const FilterSort: React.FC<FilterSortProps> = ({
  categories,
  cities,
  onFilter,
}) => {
  const [category, setCategory] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [dateRange, setdateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  })
  const [guest, setGuest] = useState<number>(1)
  const [sortBy, setSortBy] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleGuestChange = (value: number) => {
    setGuest(value)
    setIsDialogOpen(false)
  }

  const handleToggleSort = (sort: string) => {
    if (sortBy === sort) {
      setSortDirection('DESC')
    }

    if (sortBy === sort && sortDirection === 'DESC') {
      setSortBy('')
      setSortDirection('')
    }

    if (sortBy === '') {
      setSortBy(sort)
      setSortDirection('ASC')
    }

    if (sortBy !== sort) {
      setSortBy(sort)
      setSortDirection('ASC')
    }
  }

  useEffect(() => {
    console.log(sortBy, sortDirection)
  }, [sortBy, sortDirection])

  const handleSubmit = () => {
    const data = {
      name: search,
      category: category,
      city: location,
      checkInDate: format(dateRange?.from!, 'yyyy-MM-dd'),
      checkoutDate: format(dateRange?.to!, 'yyyy-MM-dd'),
      totalGuests: guest,
      sortBy: sortBy,
      sortDirection: sortDirection,
    }
    console.log(data)
    onFilter(data)
  }

  return (
    <div className='w-full space-y-4 my-4'>
      <div className='px-4 md:px-16'>
        <CategoryCarousel
          selectedCategory={category}
          categories={categories}
          setCtg={setCategory}
        />
      </div>

      <div className={`grid lg:grid-cols-7 gap-5 px-4 lg:px-11`}>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className='px-4 py-[6px] text-sm w-full focus:outline-none border border-secondary rounded-md'
          type='text'
          placeholder='Search...'
        />

        <Select
          options={cities}
          placeholder='Select destination'
          onSelect={(selectedValue) => {
            if (typeof selectedValue === 'string') {
              setLocation(selectedValue)
            }
          }}
        />
        <DatePicker
          mode='range'
          value={dateRange}
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
            sortBy === 'PRICE' && 'border-2 border-primary'
          }`}
          onClick={() => handleToggleSort('PRICE')}
        >
          Price
          {sortBy === 'PRICE' && sortDirection === 'ASC' && <TrendingDown />}
          {sortBy === 'PRICE' && sortDirection === 'DESC' && <TrendingUp />}
        </Button>
        <Button
          variant='outline'
          type='button'
          className={`gap-x-4 justify-between ${
            sortBy === 'NAME' && 'border-2 border-primary'
          }`}
          onClick={() => handleToggleSort('NAME')}
        >
          Name
          {sortBy === 'NAME' && sortDirection === 'ASC' && <ArrowDownAZ />}
          {sortBy === 'NAME' && sortDirection === 'DESC' && <ArrowUpZA />}
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
