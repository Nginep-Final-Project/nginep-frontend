import { initialUserProfile, UserProfile } from '@/types/profile'
import { response } from '@/types/response'
import { useEffect, useState } from 'react'

const useProfile = () => {
  const [result, setResult] = useState<UserProfile>(initialUserProfile)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const handleProfile = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/profile`,
          { credentials: 'include' }
        )

        const data: response = await response.json()
        setLoading(false)
        setResult(data.data)
        return data
      } catch (error) {
        setError(error)
        console.error('Email Validation error:', error)
      }
      setLoading(false)
    }
    handleProfile()
  }, [])

  return { result, loading, error }
}
export default useProfile
