import { initialPropertyDetail, PropertyDetail } from '@/types/property'
import { response } from '@/types/response'
import { useEffect, useState } from 'react'

const useProperty = (propertyId: number) => {
  const [result, setResult] = useState<PropertyDetail>(initialPropertyDetail)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const handleDetailProperty = async (propertyId: number) => {
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/property/${propertyId}`,
          {
            credentials: 'include',
          }
        )

        const data: response = await response.json()
        setLoading(false)
        setResult(data.data)
        return data
      } catch (error) {
        setError(error)
        console.error('Detail property error:', error)
      }
      setLoading(false)
    }

    if (propertyId) {
      handleDetailProperty(propertyId)
    }
  }, [propertyId])

  return { result, loading, error }
}
export default useProperty
