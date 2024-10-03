'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface PropertyCardProps {
  name: string
  location: string
  rooms: string[]
  imageUrl: string[]
  onEdit: () => void
  onDelete: () => void
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  name,
  location,
  rooms,
  imageUrl,
  onEdit,
  onDelete,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(imageUrl[0])

  return (
    <div className='flex flex-col-reverse md:flex-row border border-secondary rounded-lg p-4 mb-4 w-full'>
      <div className='md:w-2/3 flex flex-col justify-between'>
        <div>
          <h2 className='md:text-2xl font-semibold line-clamp-2'>{name}</h2>
          <p className='text-sm text-blue-600 underline cursor-pointer'>
            {location}
          </p>

          <div className='mt-4'>
            <p className='font-semibold'>Room</p>
            <div className='flex flex-col text-xs md:text-base md:flex-row'>
              {rooms.map((room, index) => (
                <p key={index}>{`・ ${room}`}</p>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-6 space-x-4'>
          <Button
            variant='cancel'
            className='py-2 px-4 rounded-md hover:bg-primary-text'
            onClick={onDelete}
          >
            Delete
          </Button>
          <Button className='text-white py-2 px-4 rounded-md' onClick={onEdit}>
            Edit
          </Button>
        </div>
      </div>

      <div className='md:w-1/3 relative'>
        {!imageUrl ? (
          <div>Loading...</div>
        ) : imageUrl.length === 0 ? (
          <div>No images available</div>
        ) : (
          <Image
            src={imgSrc}
            alt={name}
            width={300}
            height={200}
            style={{ height: '200px', width: '200px' }}
            className='h-[200px] w-[300px] rounded-md object-cover'
            layout='responsive'
            onError={() => {
              setImgSrc(
                'https://res.cloudinary.com/dhbg53ncx/image/upload/v1727888100/awip3lporwjjt3cewu4o.jpg'
              )
            }}
          />
        )}
      </div>
    </div>
  )
}
export default PropertyCard
