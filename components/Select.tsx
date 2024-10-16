'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import Image from 'next/image'
import Delete from '@/public/delete.svg'
import usePropertyFacility from '@/hooks/usePropertyFacility'
import { Facility } from '@/types/property'

interface Option {
  id?: number
  value: string
  label: string
}

interface SelectProps {
  options: Option[]
  placeholder?: string
  emptyMessage?: string
  searchPlaceholder?: string
  className?: string
  onSelect?: (value: string | string[]) => void
  isMulti?: boolean
  initialValue?: string | string[]
  isEditingMode?: boolean
  facilities?: Facility[]
  propertyId?: number
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select an option...',
  emptyMessage = 'No option found.',
  searchPlaceholder = 'Search...',
  className = '',
  onSelect,
  isMulti = false,
  initialValue,
  facilities,
  isEditingMode = false,
  propertyId,
}) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string | string[]>(
    initialValue !== undefined ? initialValue : isMulti ? [] : ''
  )

  const { handleCreatePropertyFacility, handleDeletePropertyFacility } =
    usePropertyFacility()

  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue)
    }
  }, [initialValue])

  const handleSelect = (currentValue: string) => {
    let newValue: string | string[]

    if (isMulti) {
      newValue =
        Array.isArray(value) && value.includes(currentValue)
          ? value.filter((val) => val !== currentValue)
          : [...(Array.isArray(value) ? value : []), currentValue]
    } else {
      newValue = currentValue === value ? '' : currentValue
    }

    setValue(newValue)
    if (onSelect) {
      onSelect(newValue)
    }
    if (!isMulti) {
      setOpen(false)
    }
  }

  const handleAddValue = async (value: string) => {
    try {
      if (isEditingMode === true) {
        const result = await handleCreatePropertyFacility({
          value: value,
          propertyId: propertyId!,
        })
        if (result?.success) {
          handleSelect(value)
        }
        return
      }

      handleSelect(value)
    } catch (error) {
      console.log('Add facility error: ', error)
    }
  }

  const handleDeleteValue = async (value: string, option: Option) => {
    try {
      if (isEditingMode === true) {
        const facilityId = facilities?.filter(
          (e) => e.value === option.value
        )[0].id

        const result = await handleDeletePropertyFacility(facilityId!)
        if (result?.success) {
          handleSelect(value)
        }
        return
      }

      handleSelect(value)
    } catch (error) {
      console.log('Delete facility error: ', error)
    }
  }

  const getDisplayValue = () => {
    if (isMulti) {
      return Array.isArray(value) && value.length > 0
        ? options
            .filter((option) => value.includes(option.value))
            .map((option) => (
              <Badge
                key={option.value}
                variant='outline'
                className='flex gap-x-2 mr-1'
              >
                {option.label}
                <Image
                  src={Delete}
                  alt='delete'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleDeleteValue(option.value, option)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => {
                    handleDeleteValue(option.value, option)
                  }}
                />
              </Badge>
            ))
        : placeholder
    } else {
      return value
        ? options.find((option) => option.value === value)?.label
        : placeholder
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'w-full justify-between',
            isMulti && 'h-auto',
            className
          )}
        >
          <div className='flex w-3/4 line-clamp-1'>{getDisplayValue()}</div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-screen max-w-[var(--radix-popover-trigger-width)] p-0 border-secondary'>
        <Command className='bg-white w-full'>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    handleAddValue(option.value)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      isMulti
                        ? Array.isArray(value) && value.includes(option.value)
                          ? 'opacity-100'
                          : 'opacity-0'
                        : value === option.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default Select
