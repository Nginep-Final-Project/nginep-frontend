'use client'
import { Button } from '@/components/ui/button'
import PropertyCard from '../_component/PropertyCard'

const properties = [
  {
    name: 'JW Marriott Hotel Medan',
    location: 'Medan Merdeka, Medan, Indonesia',
    rooms: ['Standard', 'Deluxe king', 'Deluxe double'],
    imageUrl:
      'https://res.cloudinary.com/dhbg53ncx/image/upload/v1721305269/sle663d3qhq2qllid8kd.jpg',
  },
  {
    name: 'Hilton Bali Resort',
    location: 'Bali, Indonesia',
    rooms: ['Suite', 'Ocean View', 'Garden View'],
    imageUrl:
      'https://res.cloudinary.com/dhbg53ncx/image/upload/v1721305269/sle663d3qhq2qllid8kd.jpg',
  },
  {
    name: 'Four Seasons Hotel Tokyo',
    location: 'Tokyo, Japan',
    rooms: ['Superior', 'Deluxe', 'Executive Suite'],
    imageUrl:
      'https://res.cloudinary.com/dhbg53ncx/image/upload/v1721305269/sle663d3qhq2qllid8kd.jpg',
  },
  {
    name: 'The Ritz-Carlton Hong Kong',
    location: 'Hong Kong, China',
    rooms: ['Club Room', 'Harbor View', 'Executive Suite'],
    imageUrl:
      'https://res.cloudinary.com/dhbg53ncx/image/upload/v1721305269/sle663d3qhq2qllid8kd.jpg',
  },
  {
    name: 'Mandarin Oriental Bangkok',
    location: 'Bangkok, Thailand',
    rooms: ['Garden Suite', 'River View', 'Premier Room'],
    imageUrl:
      'https://res.cloudinary.com/dhbg53ncx/image/upload/v1721305269/sle663d3qhq2qllid8kd.jpg',
  },
]

const PropertyList = () => {
  const handleEdit = (hotelName: string) => {
    console.log(`Edit button clicked for ${hotelName}`)
  }

  const handleDelete = (hotelName: string) => {
    console.log(`Delete button clicked for ${hotelName}`)
  }
  return (
    <div className='p-8 flex flex-col items-center'>
      {properties.map((hotel, index) => (
        <PropertyCard
          key={index}
          name={hotel.name}
          location={hotel.location}
          rooms={hotel.rooms}
          imageUrl={hotel.imageUrl}
          onEdit={() => handleEdit(hotel.name)}
          onDelete={() => handleDelete(hotel.name)}
        />
      ))}
      <Button>Load More</Button>
    </div>
  )
}
export default PropertyList
