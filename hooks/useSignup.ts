import { response } from '@/types/response'
import { useState } from 'react'

interface Signup {
  fullName: string
  dateOfBirth: string
  email: string
  password: string
  role: string
}

const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleSignup = async (request: Signup) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/sign-up`,
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
      console.error('Sign up error:', error)
    }
    setLoading(false)
  }
  return {
    handleSignup,
    loading,
    error,
  }
}
export default useSignup
