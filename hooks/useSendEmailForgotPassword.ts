import { response } from '@/types/response'
import { useState } from 'react'

const useSendEmailForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleSendEmailForgotPassword = async (email: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/forgot-password-verification/${email}`,
        {
          method: 'POST',
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
      console.error('Send Email Forgot Password error:', error)
    }
    setLoading(false)
  }

  return { handleSendEmailForgotPassword, loading, error }
}
export default useSendEmailForgotPassword
