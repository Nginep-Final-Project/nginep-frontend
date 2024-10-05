import { toast } from '@/components/ui/use-toast'
import { response } from '@/types/response'
import { useState } from 'react'

const usePropertyFacility = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleCreatePropertyFacility = async (request: {
    value: string
    propertyId: number
  }) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/property-facility`,
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
      console.error('Create property facility error:', error)
    }
    setLoading(false)
  }

  const handleDeletePropertyFacility = async (propertyFacilityId: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/property-facility/${propertyFacilityId}`,
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
        title: 'Delete property facility failed',
      })
      console.error('Delete property facility error:', error)
    }
    setLoading(false)
  }

  return {
    handleCreatePropertyFacility,
    handleDeletePropertyFacility,
    loading,
    error,
  }
}
export default usePropertyFacility
