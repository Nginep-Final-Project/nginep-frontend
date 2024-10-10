import { response } from '@/types/response'
import { useState } from 'react'

interface Languages {
  languageName: string
  tenantId: number
}

const useLanguage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleAddLanguage = async (request: Languages) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/languages`,
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
    } catch (err) {
      setError(err)
      console.error('Add language error:', error)
    }
    setLoading(false)
  }

  const handleDeleteLanguage = async (languageId: number) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/languages/${languageId}`,
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
      setLoading(false)

      return data
    } catch (err) {
      setError(err)
      console.error('Delete language error:', error)
    }
    setLoading(false)
  }

  return { handleAddLanguage, handleDeleteLanguage, loading, error }
}
export default useLanguage
