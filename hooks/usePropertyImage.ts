import { toast } from '@/components/ui/use-toast'
import { PropertyImage } from '@/types/createProperty'
import { response } from '@/types/response'
import { useState } from 'react'

const usePropertyImage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleCreatePropertyImage = async (request: PropertyImage) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/property-image`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
      console.error('Create property image error:', error)
    }
    setLoading(false)
  }

  const handleDeletePropertyImage = async (propertyImageId: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/property-image/${propertyImageId}`,
        {
          method: 'DELETE',
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
        title: 'Delete property image failed',
      })
      console.error('Delete property image error:', error)
    }
    setLoading(false)
  }

  const handleSetThumbnail = async (request: {
    publicKey: string
    propertyId: number
  }) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/property-image`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
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
      console.error('Set property image error:', error)
      toast({
        variant: 'destructive',
        title: 'Set property image failed',
      })
    }
    setLoading(false)
  }

  return {
    handleCreatePropertyImage,
    handleDeletePropertyImage,
    handleSetThumbnail,
    loading,
    error,
  }
}
export default usePropertyImage
