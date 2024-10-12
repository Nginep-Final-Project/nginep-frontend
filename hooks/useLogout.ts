import { logOutAuth } from '@/actions/auth'
import { toast } from '@/components/ui/use-toast'
import { response } from '@/types/response'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useLogout = () => {
  const [response, setResponse] = useState<response>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const router = useRouter()

  const handleLogOut = async () => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/auth/logout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` Bearer ${token}`,
          },
          credentials: 'include',
        }
      )

      const data: response = await response.json()

      return data
    } catch (error) {
      setError(error)
      console.error('Logout error:', error)
    }
    setLoading(false)
  }

  return { handleLogOut, response, loading, error }
}
export default useLogout
