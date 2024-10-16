'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import PropertyDialog from './PropertyDialog'

interface AmenitiesListProps {
  amenities: string[]
}

const FacilityList: React.FC<AmenitiesListProps> = ({ amenities }) => {
  return (
    <div className='py-8 px-4 lg:px-32'>
      <h2 className='text-2xl font-bold mb-4'>What this place offers</h2>
      <div className='grid w-full md:grid-cols-3 py-4 gap-4 border-b border-grey-text md:pb-14'>
        <div className='md:col-span-2 flex flex-wrap flex-row justify-start items-start gap-4'>
          {amenities.slice(0, 6).map((amenity, index) => (
            <div key={index} className='border border-secondary rounded-md p-2'>
              {amenity}
            </div>
          ))}
        </div>
        {amenities.length > 6 && (
          <div className='justify-self-center md:justify-self-start my-auto'>
            <PropertyDialog
              itemName='facilities'
              content={
                <>
                  <DialogHeader>
                    <DialogTitle>What this place offers</DialogTitle>
                  </DialogHeader>
                  <div className='flex flex-wrap flex-col md:flex-row justify-start items-start gap-4'>
                    {amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className='border border-secondary rounded-md p-2'
                      >
                        {amenity}
                      </div>
                    ))}
                  </div>
                </>
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default FacilityList
