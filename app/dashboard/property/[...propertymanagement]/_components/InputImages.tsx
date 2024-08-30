import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState, useCallback, useMemo } from 'react'
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone'
import Delete from '@/public/delete.svg'
import { ArrowLeft } from 'lucide-react'
import Edit from '@/public/pencil.svg'

interface InputImagesProps {
  onImagesChange?: (files: File[]) => void
}
const InputImages: React.FC<InputImagesProps> = ({ onImagesChange }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [uploadStatus, setUploadStatus] = useState<string>('')

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const newImages = [...selectedImages, ...acceptedFiles]
      setSelectedImages(newImages)
      if (onImagesChange) {
        onImagesChange(newImages)
      }
    },
    [selectedImages, onImagesChange]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  // const onUpload = async () => {
  //   setUploadStatus('Uploading....')
  //   const formData = new FormData()
  //   selectedImages.forEach((image) => {
  //     formData.append('file', image)
  //   })
  //   try {
  //     const response = await fetch(
  //       'https://cloudinary-react-dropzone.vercel.app/api/upload',
  //       {
  //         method: 'POST',
  //         body: formData,
  //       }
  //     )
  //     console.log(response.body)
  //     setUploadStatus('upload successful')
  //   } catch (error) {
  //     console.error('imageUpload error:', error)
  //     setUploadStatus('Upload failed..')
  //   }
  // }

  const deleteImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index)
    setSelectedImages(newImages)
    if (onImagesChange) {
      onImagesChange(newImages)
    }
  }

  const moveImageToFront = (index: number) => {
    const newImages = [
      selectedImages[index],
      ...selectedImages.slice(0, index),
      ...selectedImages.slice(index + 1),
    ]
    setSelectedImages(newImages)
    if (onImagesChange) {
      onImagesChange(newImages)
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
          selectedImages.map((image, index) => (
            <div key={index} className='relative group'>
              <Image
                src={URL.createObjectURL(image)}
                alt=''
                width={160}
                height={240}
                className='h-60 w-full object-cover'
              />
              <div className='absolute top-0 right-0 p-2 hidden group-hover:flex space-x-2'>
                {/* <Button
                  onClick={() => deleteImage(index)}
                  className='bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors'
                >
                  <X size={16} />
                </Button> */}
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
          ))}
      </div>
      {/* {selectedImages.length > 0 && (
        <div className='flex justify-center items-center flex-col'>
          <button
            onClick={onUpload}
            className='px-4 py-2 border border-green-500 bg-white mt-8 text-base font-bold text-gray-700 cursor-pointer'
          >
            Upload to Cloudinary
          </button>
          <p className='italic'>{uploadStatus}</p>
        </div>
      )} */}
    </div>
  )
}

export default InputImages
