import { toast } from '@/components/ui/use-toast'
import { CreateProperty } from '@/types/createProperty'
import { response } from '@/types/response'
import { useState } from 'react'

const usePropertyManagement = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleCreateProperty = async (request: CreateProperty) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/property`,
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
      console.error('Detail property error:', error)
    }
    setLoading(false)
  }

  const handleDeleteProperty = async (propertyId: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/property/${propertyId}`,
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
        title: 'Delete property failed',
      })
      console.error('Delete property error:', error)
    }
    setLoading(false)
  }

  return {
    handleCreateProperty,
    handleDeleteProperty,
    loading,
    error,
  }
}
export default usePropertyManagement
