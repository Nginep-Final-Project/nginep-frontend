import { response } from '@/types/response'
import { useState } from 'react'

interface EmailVerification {
  email: string
  name: string
}

const useEmailVerification = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleEmailVerification = async (request: EmailVerification) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/send-verification`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      )

      const data: response = await response.json()
      setLoading(false)
      return data
    } catch (error) {
      setError(error)
      console.error('Email Verification error:', error)
    }
    setLoading(false)
  }

  return { handleEmailVerification, loading, error }
}
export default useEmailVerification
