'use client'
import Image from 'next/image'
import { useState } from 'react'
import ImageCarousel from '@/components/ImageCarousel'
import PropertyDialog from './PropertyDialog'

interface ImageGalleryProps {
  images: string[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0])
  return (
    <div className='container mx-auto p-4 lg:px-32'>
      <div className='hidden md:grid grid-cols-4 gap-4'>
        <div className='col-span-2 row-span-2'>
          {!images ? (
            <div>Loading...</div>
          ) : images.length === 0 ? (
            <div>No images available</div>
          ) : (
            <Image
              src={images[0]}
              alt='property-image'
              layout='responsive'
              width={600}
              height={400}
              style={{ height: 'auto', width: 'auto' }}
              className='h-[400px] w-[600px] rounded-lg object-cover'
            />
          )}
        </div>
        {images.slice(1, 5).map((image, index) => (
          <div key={index} className={index === 3 ? 'relative' : ''}>
            <Image
              src={image}
              alt={`property-image-${index}`}
              layout='responsive'
              width={300}
              height={200}
              style={{ height: 'auto', width: 'auto' }}
              className='h-[200px] w-[300px] rounded-lg object-cover'
            />
            {index === 3 && (
              <div className='absolute bottom-2 right-2 '>
                <PropertyDialog
                  content={
                    <ImageCarousel imageSrc={images} showNavigation={true} />
                  }
                  itemName={'photos'}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='md:hidden'>
        <ImageCarousel imageSrc={images} showNavigation={true} />
      </div>
    </div>
  )
}
export default ImageGallery
