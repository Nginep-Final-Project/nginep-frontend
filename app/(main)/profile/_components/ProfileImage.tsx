'use client'

import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

interface ProfileImageProp {
  initImage: string
  initName: string
  role: string
}

const ProfileImage: React.FC<ProfileImageProp> = ({
  initImage,
  initName,
  role,
}) => {
  const [avatar, setAvatar] = useState<string>(
    'https://res.cloudinary.com/dhbg53ncx/image/upload/v1724048239/y2v5dowacq3zuvraaeem.png'
  )
  const [error, setError] = useState<string>('')
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setAvatar(initImage)
  }, [initImage])

  const handleEditClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const validateImage = (file: File): string | null => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    const maxSize = 1 * 1024 * 1024 // 1MB

    if (!validTypes.includes(file.type)) {
      return 'Invalid file type. Please upload a .jpg, .jpeg, .png, or .gif file.'
    }

    if (file.size > maxSize) {
      return 'File size exceeds 1MB limit.'
    }

    return null
  }

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0]
    if (!file) return

    const validationError = validateImage(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsUploading(true)
    setError('')

    try {
      //  const resizedBlob = await resizeImage(file)
      const imageUrl = URL.createObjectURL(file)
      setAvatar(imageUrl)
      setError('')
      // const formData = new FormData()
      // formData.append('file', file)

      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // })

      // if (!response.ok) {
      //   throw new Error('Upload failed')
      // }

      //  const data: CloudinaryUploadResponse = await response.json()
      //  setAvatar(data.url)
    } catch (err) {
      setError('Error uploading image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='flex flex-col items-center space-y-4 p-4 bg-white rounded-lg border-secondary  shadow'>
      <div className='relative'>
        <Image
          src={avatar}
          alt='Profile-image'
          width={128}
          height={128}
          style={{ height: 'auto', width: 'auto' }}
          className='rounded-full object-cover'
        />
        <Button
          variant='outline'
          onClick={handleEditClick}
          className='absolute bottom-0 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white'
          disabled={isUploading}
        >
          <Camera size={20} />
          Edit
        </Button>
      </div>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept='.jpg,.jpeg,.png,.gif'
        className='hidden'
      />
      <div className='text-center'>
        <h2 className='text-xl font-bold'>{initName}</h2>
        <p className='text-grey-text'>{role}</p>
      </div>
      {isUploading && <p className='text-blue-500'>Uploading...</p>}
      {/* {error && (
        <Alert variant='destructive'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )} */}
    </div>
  )
}
export default ProfileImage
