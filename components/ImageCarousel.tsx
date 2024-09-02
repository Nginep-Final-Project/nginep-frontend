'use client'
import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from './ui/carousel'

const ImageCarousel: React.FC<{ showNavigation?: boolean }> = ({
  showNavigation,
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className='w-full md:w-3/4 relative'>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className='p-1 h-40 md:h-60 w-full border border-white text-white rounded-md'>
                {index + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showNavigation && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
      <div className='absolute flex items-center gap-x-1 bottom-2 left-1/2 -translate-x-1/2 text-center text-sm text-muted-foreground'>
        {Array.from({ length: count }).map((_, index) => {
          return (
            <div
              key={index}
              className={`rounded-full ${
                current - 1 === index
                  ? 'bg-white h-2 w-2 '
                  : 'bg-secondary h-1 w-1'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ImageCarousel
