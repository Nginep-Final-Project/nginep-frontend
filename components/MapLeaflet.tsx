import React, { useCallback, useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet'
import { Icon, LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (Icon.Default.prototype as any)._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
})

interface MapEventsProps {
  onLocationChange: (position: LatLngExpression) => void
}

interface MapLeafletProps {
  position: LatLngExpression
  onLocationChange: (position: LatLngExpression) => void
}

interface MapFlyToProps {
  position: LatLngExpression
}

const MapLeaflet: React.FC<MapLeafletProps> = ({
  position,
  onLocationChange,
}) => {
  const MapEvents = ({ onLocationChange }: MapEventsProps) => {
    const map = useMap()

    useMapEvents({
      click: (e) => {
        const newPos: LatLngExpression = [e.latlng.lat, e.latlng.lng]
        onLocationChange(newPos)
        map.flyTo(newPos, map.getZoom())
      },
    })

    return null
  }

  function MapFlyTo({ position }: MapFlyToProps) {
    const map = useMap()

    useEffect(() => {
      if (map && position) {
        map.flyTo(position, map.getZoom())
      }
    }, [map, position])

    return null
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      className='z-10'
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} />
      <MapEvents onLocationChange={onLocationChange} />
      <MapFlyTo position={position} />
    </MapContainer>
  )
}
export default MapLeaflet
