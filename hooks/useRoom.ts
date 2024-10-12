import { initialPropertyDetail, Room } from '@/types/property'
import { response } from '@/types/response'
import { useEffect, useState } from 'react'

interface SearchRoomReqProps {
  startDate: string
  endDate: string
  totalGuest: number
  propertyId: number
}

const useRoom = () => {
  const [result, setResult] = useState<Room[]>(initialPropertyDetail.rooms)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleRoomAvailable = async (request: SearchRoomReqProps) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/rooms/availability`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` Bearer ${token}`,
          },
          body: JSON.stringify(request),
          credentials: 'include',
        }
      )

      const data: response = await response.json()
      setLoading(false)
      setResult(data.data)
      return data
    } catch (error) {
      setError(error)
      console.error('Room available error:', error)
    }
    setLoading(false)
  }

  return { handleRoomAvailable, result, loading, error }
}
export default useRoom
