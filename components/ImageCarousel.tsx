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
import Image from 'next/image'

const ImageCarousel: React.FC<{
  showNavigation?: boolean
  imageSrc: string[]
}> = ({ showNavigation, imageSrc = [] }) => {
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
          {imageSrc.map((_, index) => (
            <CarouselItem key={index}>
              <Image
                src={imageSrc[index]}
                alt={imageSrc[index]}
                width={315}
                height={320}
                style={{ width: 'auto', height: 'auto' }}
                className='object-cover'
              />
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
        {imageSrc.map((_, index) => {
          return (
            <div
              key={index}
              className={`rounded-full ${
                current - 1 === index
                  ? 'bg-grey-text h-2 w-2 '
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
