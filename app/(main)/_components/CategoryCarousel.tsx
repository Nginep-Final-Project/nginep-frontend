'use client'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Category } from '@/types/property'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface CategoryProps {
  categories: Category[]
  setCtg: Dispatch<SetStateAction<string>>
}

const CategoryCarousel: React.FC<CategoryProps> = ({ categories, setCtg }) => {
  const [category, setCategory] = useState<string>('')

  return (
    <Carousel className='w-full'>
      <CarouselContent className='flex items-center'>
        {categories.map((c, index) => (
          <CarouselItem key={index} className='basis-auto'>
            <Button
              variant='ghost'
              className={`${
                category === c.value
                  ? 'border-b border-primary-text rounded-none b-2'
                  : 'text-grey-text'
              } w-full`}
              onClick={() => {
                setCategory(c.value)
                setCtg(c.value)
              }}
            >
              {c.label}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
export default CategoryCarousel
