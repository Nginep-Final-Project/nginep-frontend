import { Item } from '@/app/dashboard/_component/ItemManagement'
import { response } from '@/types/response'
import { useEffect, useState } from 'react'

const useCategory = () => {
  const [result, setResult] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const handleGetCategory = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/category`,
          {
            credentials: 'include',
          }
        )
        const data: response = await response.json()
        setLoading(false)
        setResult(data.data)
        return data
      } catch (err) {
        setError(err)
        console.error('Get category error:', error)
      }
      setLoading(false)
    }

    handleGetCategory()
  }, [])

  const handleAddCategory = async (request: { value: string }) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/category`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
      console.error('Add category error:', error)
    }
    setLoading(false)
  }

  const handleEditCategory = async (request: { id: number; value: string }) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/category`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
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
      console.error('Edit category error:', error)
    }
    setLoading(false)
  }

  const handleDeleteCategory = async (categoryId: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/category/${categoryId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      )
      const data: response = await response.json()
      setLoading(false)

      return data
    } catch (err) {
      setError(err)
      console.error('Delete category error:', error)
    }
    setLoading(false)
  }

  return {
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    result,
    loading,
    error,
  }
}
export default useCategory
