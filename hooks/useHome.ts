import { emptyPropertyData, PropertyData } from '@/types/property'
import { response } from '@/types/response'
import { HOME } from '@/utils/constanta'
import { useEffect, useState } from 'react'

const useHome = () => {
  const [result, setResult] = useState<PropertyData>(emptyPropertyData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const handleHome = async () => {
      setLoading(true)
      try {
        const storedData = sessionStorage.getItem(HOME)
        if (storedData) {
          const parseStoredData = JSON.parse(storedData)
          setResult(parseStoredData.data)
          setLoading(false)
          return
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/property/home`,
          {
            credentials: 'include',
          }
        )
        const data: response = await response.json()
        setLoading(false)
        setResult(data.data)
        sessionStorage.setItem(HOME, JSON.stringify(data))
        return data
      } catch (err) {
        setError(err)
        console.error('Get category error:', error)
      }
      setLoading(false)
    }

    handleHome()
  }, [error])

  return {
    result,
    loading,
    error,
  }
}
export default useHome
