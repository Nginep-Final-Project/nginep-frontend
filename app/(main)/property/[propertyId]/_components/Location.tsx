'use client'

import { LatLngExpression } from 'leaflet'
import dynamic from 'next/dynamic'

const MapWithNoSSR = dynamic(() => import('@/components/MapLeaflet'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

const Location: React.FC<{ location: string; position: LatLngExpression }> = ({
  location,
  position,
}) => {
  return (
    <div className='p-4 lg:px-32'>
      <h2 className='text-2xl font-bold mb-4'>Where you will be</h2>
      <p>{location}</p>
      <div className='mb-4 -z-50 border-b border-secondary py-4 md:pb-14'>
        <div className='h-96 w-full'>
          <MapWithNoSSR position={position} onLocationChange={() => {}} />
        </div>
      </div>
    </div>
  )
}
export default Location
