import { toast } from '@/components/ui/use-toast'
import { response } from '@/types/response'
import { useState } from 'react'

interface ImageUpload {
  publicId: string
  url: string
  format: string
}

interface ResponseImageUpload {
  statusCode: number
  message: string
  success: boolean
  data: ImageUpload
}

const useUploadImage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleUploadImage = async (file: File) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/cloudinary/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: ` Bearer ${token}`,
          },
          body: formData,
          credentials: 'include',
        }
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data: ResponseImageUpload = await response.json()
      setLoading(false)

      return data
    } catch (error) {
      setError(error)
      console.log('Upload image error:', error)
    }
    setLoading(false)
  }

  const handleUpdateImage = async (file: File, publicId: string) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('publicId', publicId)
      formData.append('file', file)

      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('sid='))
        ?.split('=')[1]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/cloudinary/update`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` Bearer ${token}`,
          },
          body: formData,
          credentials: 'include',
        }
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data: ResponseImageUpload = await response.json()
      setLoading(false)

      return data
    } catch (error) {
      setError(error)
      console.log('Upload image error:', error)
    }
    setLoading(false)
  }

  return { handleUploadImage, handleUpdateImage, loading, error }
}
export default useUploadImage
