import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

const AlertHandler = () => {
  const searchParams = useSearchParams()
  const [alert, setAlert] = useState<{ title: string; description: string }>()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      switch (error) {
        case 'unauthenticated':
          setAlert({
            title: 'Authentication Required',
            description: 'Uh-oh! You forgot to log in! 👀',
          })
          break
        case 'unauthorized_tenant':
          setAlert({
            title: 'Access Denied',
            description:
              'Access denied! Sorry, Guest, this area is for Tenants only. 🚪🔒',
          })
          break
        case 'unauthorized_guest':
          setAlert({
            title: 'Access Denied',
            description:
              'Access denied! Sorry, Tenant, this area is for Guest only. 🚪🔒',
          })
          break
        default:
          setAlert({
            title: 'Error',
            description: 'An unexpected error occurred.',
          })
      }
    }
  }, [searchParams])

  if (!alert) return null

  return (
    <Alert variant='destructive'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>{alert.title}</AlertTitle>
      <AlertDescription>{alert.description}</AlertDescription>
    </Alert>
  )
}

export default AlertHandler
