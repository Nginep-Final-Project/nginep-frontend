import { toast } from '@/components/ui/use-toast'
import { NotAvailableDates } from '@/types/createProperty'
import { response } from '@/types/response'
import { useState } from 'react'

const useNotAvailableDate = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleCreateNotAvailableDate = async (request: NotAvailableDates) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/bookings/not-available-booking`,
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
      console.error('Create not available date error:', error)
    }
    setLoading(false)
  }

  const handleDeleteNotAvailableDate = async (bookingId: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/bookings/not-available-booking/${bookingId}`,
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
        title: 'Delete not available date failed',
      })
      console.error('Delete not available date error:', error)
    }
    setLoading(false)
  }

  return {
    handleCreateNotAvailableDate,
    handleDeleteNotAvailableDate,
    loading,
    error,
  }
}
export default useNotAvailableDate
