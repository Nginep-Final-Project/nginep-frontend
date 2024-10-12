import { response } from '@/types/response'
import { useState } from 'react'

const useAccountVerification = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  interface AccountVerification {
    email: string
    code: string
  }

  const handleAccountVerification = async (request: AccountVerification) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/verification`,
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
      console.error('Account Verification error:', error)
    }
    setLoading(false)
  }
  return {
    handleAccountVerification,
    loading,
    error,
  }
}
export default useAccountVerification
