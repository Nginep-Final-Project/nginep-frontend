'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { response } from '@/types/response'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

interface ProfileImageProp {
  initImage: string
  picturePublicId: string | null
  role: string
}

const ProfileImage: React.FC<ProfileImageProp> = ({
  initImage,
  picturePublicId,
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
      const imageUrl = URL.createObjectURL(file)
      setAvatar(imageUrl)
      setError('')
      const formData = new FormData()
      if (picturePublicId !== null) {
        formData.append('publicId', picturePublicId)
      }
      formData.append('file', file)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/users/update/profile-picture`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        }
      )

      const data: response = await response.json()
      if (!data.success) {
        toast({
          variant: 'destructive',
          description: data.message,
        })
        return
      }
      toast({
        description: data.message,
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        description: 'Upload image failed',
      })
      setError('Error uploading image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='flex flex-col items-center space-y-8 p-4 bg-white rounded-lg border border-secondary shadow'>
      <div className='relative'>
        <Image
          src={avatar}
          alt='Profile-image'
          width={128}
          height={128}
          style={{ height: '128px', width: '128px', objectFit: 'cover' }}
          className='h-32 w-32 rounded-full shadow-2xl border border-secondary'
        />
        <Button
          variant='outline'
          onClick={handleEditClick}
          className='absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white'
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
        <p className='text-grey-text'>{role}</p>
      </div>
      {isUploading && <p>Uploading...</p>}
    </div>
  )
}
export default ProfileImage
