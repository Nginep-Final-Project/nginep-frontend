import { Item } from '@/app/dashboard/_component/ItemManagement'
import { response } from '@/types/response'
import { useEffect, useState } from 'react'

const useFacility = () => {
  const [result, setResult] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const handleGetFacility = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/facility`,
          {
            credentials: 'include',
          }
        )
        const data: response = await response.json()
        setLoading(false)
        setResult(data.data)
        return data
      } catch (err) {
        setError(err)
        console.error('Get facility error:', error)
      }
      setLoading(false)
    }

    handleGetFacility()
  }, [])

  const handleAddFacility = async (request: { value: string }) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/facility`,
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
    } catch (err) {
      setError(err)
      console.error('Add facility error:', error)
    }
    setLoading(false)
  }

  const handleEditFacility = async (request: { id: number; value: string }) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/facility`,
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

      return data
    } catch (err) {
      setError(err)
      console.error('Edit facility error:', error)
    }
    setLoading(false)
  }

  const handleDeleteFacility = async (facilityId: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/facility/${facilityId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      )
      const data: response = await response.json()
      setLoading(false)

      return data
    } catch (err) {
      setError(err)
      console.error('Delete facility error:', error)
    }
    setLoading(false)
  }

  return {
    handleAddFacility,
    handleEditFacility,
    handleDeleteFacility,
    result,
    loading,
    error,
  }
}
export default useFacility
