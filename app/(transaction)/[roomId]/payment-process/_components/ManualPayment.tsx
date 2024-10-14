import React, { useState, useEffect } from 'react'
import { Upload, AlertCircle } from 'lucide-react'
import { BookingPaymentDetails } from '@/types/booking'
import Button from '../../_components/Button/Button'
import { useUploadProof } from '@/hooks/payment/useUploadProof'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import CancelBookingButton from './CancelBookingButton'

interface ManualPaymentProps {
  bookingDetails: BookingPaymentDetails
}

const ManualPayment: React.FC<ManualPaymentProps> = ({ bookingDetails }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()
  const uploadMutation = useUploadProof()

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const expiryTime = new Date(bookingDetails.expiryTime).getTime()
      const remaining = Math.max(0, expiryTime - now)
      setTimeRemaining(remaining)

      if (remaining <= 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [bookingDetails.expiryTime])

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) {
        setError('File size must be less than 1MB')
        setFile(null)
      } else if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
        setError('File must be a JPG or PNG image')
        setFile(null)
      } else {
        setError(null)
        setFile(selectedFile)
      }
    }
  }

  const handleUpload = async () => {
    if (file) {
      try {
        await uploadMutation.mutateAsync({
          proofOfPayment: file,
          paymentId: bookingDetails.paymentId,
        })

        toast({
          title: 'Success',
          description:
            'Proof of payment uploaded successfully. Redirecting to bookings in 5 seconds...',
          duration: 5000,
        })

        setIsRedirecting(true)

        setTimeout(() => {
          router.push('/user/bookings')
        }, 5000)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to upload proof of payment. Please try again.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <div className='w-full lg:w-2/3 p-6 space-y-6'>
      <h2 className='text-2xl font-semibold'>Manual Transfer Payment</h2>

      <div className='bg-gray-100 p-4 rounded-lg'>
        <p className='font-semibold'>Total Amount to Pay:</p>
        <p className='text-2xl text-pink-600'>
          IDR {bookingDetails.finalPrice.toLocaleString()}
        </p>
      </div>

      <div>
        <p className='font-semibold'>Bank Account Details:</p>
        <p>Bank Name: {bookingDetails.bankName}</p>
        <p>Account Number: {bookingDetails.bankAccountNumber}</p>
        <p>Account Holder: {bookingDetails.bankHolderName}</p>
      </div>

      <div
        className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4'
        role='alert'
      >
        <div className='flex'>
          <AlertCircle className='h-6 w-6 mr-2' />
          <div>
            <p className='font-bold'>Time Remaining</p>
            <p>
              You have {formatTime(timeRemaining)} left to upload your proof of
              payment.
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className='font-semibold mb-2'>Upload Proof of Payment:</p>
        <input
          type='file'
          accept='.jpg,.jpeg,.png'
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-pink-50 file:text-pink-700
            hover:file:bg-pink-100'
        />
        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </div>

      <Button onClick={handleUpload} disabled={!file || timeRemaining <= 0}>
        <Upload className='inline-block mr-2 h-4 w-4' /> Upload Proof of Payment
      </Button>

      <div className='text-sm text-gray-600'>
        <p>Please ensure:</p>
        <ul className='list-disc list-inside'>
          <li>The transfer amount matches the total amount to pay</li>
          <li>The transfer is made to the correct bank account</li>
          <li>The proof of payment image is clear and readable</li>
          <li>Keep the original proof of payment for your records</li>
        </ul>
      </div>
      {isRedirecting && (
        <div className='mt-4 text-center text-gray-600'>
          Redirecting to bookings page...
        </div>
      )}
      <div>
        <CancelBookingButton bookingId={bookingDetails.bookingId} />
      </div>
    </div>
  )
}

export default ManualPayment
