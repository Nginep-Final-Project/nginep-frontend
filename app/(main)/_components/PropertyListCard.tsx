import ImageCarousel from '@/components/ImageCarousel'
import { Property } from '@/types/property'
import { Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface PropertyListCardProps {
  properties: Property[]
}
const PropertyListCard: React.FC<PropertyListCardProps> = ({ properties }) => {
  return (
    <>
      {properties.length === 0 ? (
        <div>Property not found</div>
      ) : (
        <div className='grid gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-11'>
          {properties.map((property, index) => (
            <Link key={index} href={`/property/${property.id}`}>
              <div className='max-w-sm rounded-lg overflow-hidden shadow-lg border border-secondary'>
                <div className='w-full h-80 flex items-center justify-center'>
                  <ImageCarousel
                    imageSrc={property.propertyImage.map((e) => e.path)}
                  />
                </div>
                <div className='p-4'>
                  <h2 className='md:text-lg font-semibold w-full line-clamp-1'>
                    {property.propertyName}
                  </h2>
                  <div className='flex justify-between items-center mt-2'>
                    <div className='w-3/4'>
                      <h2 className='md:text-lg font-semibold w-full line-clamp-1'>
                        {property.propertyCity}, {property.propertyProvince}
                      </h2>
                    </div>
                    <div className='flex items-center'>
                      <Star className='w-4 h-4 mr-1' />
                      <span className='text-sm font-medium'>
                        {property.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <p className='md:text-lg font-semibold'>
                    {property.rooms.length > 0
                      ? property.rooms.sort(
                          (a, b) => a.basePrice - b.basePrice
                        )[0].basePrice
                      : 0}
                    <span className='text-sm text-grey-text'>/ night</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
export default PropertyListCard
