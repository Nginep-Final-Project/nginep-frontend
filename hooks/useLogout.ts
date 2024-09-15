import { logOutAuth } from '@/actions/auth'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'

type response = {
  statusCode: number
  message: string
  success: boolean
  data: any
}

const useLogout = () => {
  const [response, setResponse] = useState<response>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleLogOut = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/auth/logout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )

      if (!response.ok) {
        throw new Error('Logout failed')
      }
      const data = await response.json()
      logOutAuth()

      toast({
        title: data?.message,
      })
    } catch (error) {
      setError(error)
      console.error('Logout error:', error)
    }
    setLoading(true)
  }

  return { handleLogOut, response, loading, error }
}
export default useLogout
