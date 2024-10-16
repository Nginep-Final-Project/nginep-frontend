import {
  AboutYourself,
  BankAccount,
  Email,
  initialUserProfile,
  password,
  PersonalData,
  PropertyRules,
  UserProfile,
} from '@/types/profile'
import { response } from '@/types/response'
import { useEffect, useState } from 'react'
import useLogout from './useLogout'

const useProfile = () => {
  const [result, setResult] = useState<UserProfile>(initialUserProfile)
  const [updateResult, setupdateResult] = useState<String>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const handleProfile = async () => {
      setLoading(true)
      try {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('sid='))
          ?.split('=')[1]
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/profile`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: ` Bearer ${token}`,
            },
            credentials: 'include',
          }
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

  const handleUpdatePersonalData = async (request: PersonalData) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/update/personal-data`,
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
      setupdateResult(data.data)
      return data
    } catch (err) {
      setError(err)
      console.error('Update personal data error:', error)
    }
    setLoading(false)
  }

  const handleUpdateEmail = async (request: Email) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/update/email`,
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
      setupdateResult(data.data)
      return data
    } catch (err) {
      setError(err)
      console.error('Update email error:', error)
    }
    setLoading(false)
  }

  const handleUpdatePassword = async (request: password) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/update/change-password`,
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
      setupdateResult(data.data)
      return data
    } catch (err) {
      setError(err)
      console.error('Change password error:', error)
    }
    setLoading(false)
  }

  const handleUpdateAboutYourself = async (request: AboutYourself) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/update/about-yourself`,
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
      setupdateResult(data.data)
      return data
    } catch (err) {
      setError(err)
      console.error('Update about yourself error:', error)
    }
    setLoading(false)
  }

  const handleUpdateBankAccount = async (request: BankAccount) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/update/bank-account`,
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
      setupdateResult(data.data)
      return data
    } catch (err) {
      setError(err)
      console.error('Update bank account error:', error)
    }
    setLoading(false)
  }

  const handleUpdatePropertyRules = async (request: PropertyRules) => {
    setLoading(true)
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/update/property-rules`,
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
      setupdateResult(data.data)
      return data
    } catch (err) {
      setError(err)
      console.error('Update property rules error:', error)
    }
    setLoading(false)
  }

  return {
    handleUpdatePersonalData,
    handleUpdateEmail,
    handleUpdatePassword,
    handleUpdateAboutYourself,
    handleUpdateBankAccount,
    handleUpdatePropertyRules,
    result,
    updateResult,
    loading,
    error,
  }
}
export default useProfile
