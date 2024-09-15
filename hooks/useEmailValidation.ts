import { response } from '@/types/response'
import { useState } from 'react'

const useEmailValidation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleEmailValidation = async (email: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/email-validation/${email}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data: response = await response.json()
      setLoading(false)
      return data
    } catch (error) {
      setError(error)
      console.error('Email Validation error:', error)
    }
    setLoading(false)
  }
  return { handleEmailValidation, loading, error }
}
export default useEmailValidation
