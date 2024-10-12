import { response } from '@/types/response'
import { useState } from 'react'

interface ResetPassword {
  email: string
  newPassword: string
}

const useResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleResetPassword = async (request: ResetPassword) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/auth/reset-password`,
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
      console.error('Reset password error:', error)
    }
    setLoading(false)
  }

  return { handleResetPassword, loading, error }
}
export default useResetPassword
