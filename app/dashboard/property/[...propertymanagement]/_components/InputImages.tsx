import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone'
import Delete from '@/public/delete.svg'
import { ArrowLeft } from 'lucide-react'
import Edit from '@/public/pencil.svg'
import useUploadImage from '@/hooks/useUploadImage'
import { init } from 'next/dist/compiled/webpack/webpack'

interface UploadedImage {
  file?: File
  preview?: string
  path?: string
  publicKey?: string
  isThumbnail: boolean
}

interface InputImagesProps {
  onUploadSuccess: (images: UploadedImage[]) => void
  initialImages?: UploadedImage[]
}

const InputImages: React.FC<InputImagesProps> = ({
  onUploadSuccess,
  initialImages,
}) => {
  const [selectedImages, setSelectedImages] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const { handleUploadImage } = useUploadImage()

  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setSelectedImages(initialImages)
    }
  }, [initialImages])

  const uploadToCloudinary = async (
    image: UploadedImage,
    index: number
  ): Promise<UploadedImage> => {
    const response = await handleUploadImage(image.file!)
    return {
      preview: image.preview,
      path: response?.data.url!,
      publicKey: response?.data.publicId!,
      isThumbnail: index === 0,
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((file, index) => ({
        file,
        preview: URL.createObjectURL(file),
        isThumbnail: index === 0,
      }))
      setSelectedImages((prev) => [...prev, ...newImages])
    },
    [selectedImages]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  })

  const deleteImage = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index)
      if (index === 0 && newImages.length > 0) {
        newImages[0].isThumbnail = true
      }
      return newImages
    })
  }

  const moveImageToFront = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = [
        { ...prev[index], isCover: true },
        ...prev.slice(0, index),
        ...prev.slice(index + 1),
      ]
      newImages[1].isThumbnail = false
      return newImages
    })
  }

  const handleUpload = async () => {
    setUploading(true)
    try {
      const imagesToUpload = selectedImages.filter((i) => i.path === undefined)
      const uploadedImages = await Promise.all(
        imagesToUpload.map((image, index) => uploadToCloudinary(image, index))
      )

      const updatedImages = selectedImages.map((img) => {
        const uploadedImg = uploadedImages.find(
          (u) => u.preview === img.preview
        )
        return uploadedImg || img
      })

      setSelectedImages(updatedImages)
      onUploadSuccess(updatedImages)
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className=''>
      <div
        className='w-full py-2 px-4 mb-4 rounded-md border border-secondary cursor-pointer flex font-medium'
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>Select image files</p>
      </div>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] w-full gap-4'>
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => {
            return (
              <div key={index} className='relative group'>
                <Image
                  src={image.path ?? image.preview!}
                  alt=''
                  width={160}
                  height={240}
                  style={{ width: 'auto', height: 'auto' }}
                  className='h-60 w-full object-cover'
                />
                <div className='absolute top-0 right-0 p-2 hidden group-hover:flex space-x-2'>
                  <Image
                    src={Delete}
                    alt='delete'
                    onClick={() => deleteImage(index)}
                  />
                  {index !== 0 && (
                    <Image
                      src={Edit}
                      alt='edit'
                      onClick={() => moveImageToFront(index)}
                    />
                  )}
                </div>
                {index === 0 && (
                  <div className='absolute top-0 left-0 bg-success text-white px-2 py-1 text-xs'>
                    Cover
                  </div>
                )}
              </div>
            )
          })}
      </div>
      {selectedImages.length > 0 && (
        <div className='flex justify-center items-center flex-col'>
          <Button
            onClick={handleUpload}
            className='px-4 py-2 mt-8 text-base font-bold'
            disabled={uploading}
            type='button'
          >
            {uploading ? 'loading...' : 'Upload'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default InputImages
