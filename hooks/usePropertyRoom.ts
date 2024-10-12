import { toast } from '@/components/ui/use-toast'
import { Room } from '@/types/createProperty'
import { response } from '@/types/response'
import { useState } from 'react'

const usePropertyRoom = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleCreatePropertyRoom = async (request: {
    name: string
    roomPicture: string
    roomPictureId: string
    description: string
    maxGuests: number
    basePrice: number
    totalRoom: number
    notAvailableDates: any
    propertyId: number
  }) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/rooms`,
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
      return data
    } catch (error) {
      setError(error)
      console.error('Create property room error:', error)
    }
    setLoading(false)
  }

  const handleDeletePropertyRoom = async (roomId: number) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/rooms/${roomId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` Bearer ${token}`,
          },
          credentials: 'include',
        }
      )

      const data: response = await response.json()
      if (!data.success) {
        toast({
          variant: 'destructive',
          title: data.message,
        })
        return
      }
      setLoading(false)
      toast({
        title: data.message,
      })
      return data
    } catch (error) {
      setError(error)
      toast({
        variant: 'destructive',
        title: 'Delete property room failed',
      })
      console.error('Delete property room error:', error)
    }
    setLoading(false)
  }

  const handleUpdatePropertyRoom = async (request: {
    id: number
    name: string
    roomPicture: string
    roomPictureId: string
    description: string
    maxGuests: number
    basePrice: number
    totalRoom: number
  }) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/rooms`,
        {
          method: 'PUT',
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
      if (!data.success) {
        toast({
          variant: 'destructive',
          title: data.message,
        })
        return
      }
      setLoading(false)
      toast({
        title: data.message,
      })
      return data
    } catch (error) {
      setError(error)
      console.error('Edit property room error:', error)
      toast({
        variant: 'destructive',
        title: 'Edit property room failed',
      })
    }
    setLoading(false)
  }

  return {
    handleCreatePropertyRoom,
    handleDeletePropertyRoom,
    handleUpdatePropertyRoom,
    loading,
    error,
  }
}
export default usePropertyRoom
