'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ManualPayment from './_components/ManualPayment/ManualPayment'
import AutomaticPayment from './_components/AutomaticPayment/AutomaticPayment'
import PriceSummary from '../_components/PriceSummary/PriceSummary'
import TransactionLayout from '../_components/TransactionLayout/TransactionLayout'
import {
  useBookingPaymentDetails,
  useCheckExistingPendingBooking,
} from '@/hooks'

const PaymentProcess = () => {
  const params = useParams()
  const roomId = params.roomId as string
  const [paymentType, setPaymentType] = useState<
    'MANUAL_PAYMENT' | 'AUTOMATIC_PAYMENT' | null
  >(null)

  const userId = 11

  const { data: existingBookingId, isLoading: isCheckingBooking } =
    useCheckExistingPendingBooking(userId, parseInt(roomId))
  const {
    data: bookingDetails,
    isLoading: isLoadingDetails,
    error,
  } = useBookingPaymentDetails(existingBookingId)

  useEffect(() => {
    if (bookingDetails) {
      setPaymentType(
        bookingDetails.paymentType === 'MANUAL_PAYMENT'
          ? 'MANUAL_PAYMENT'
          : 'AUTOMATIC_PAYMENT'
      )
    }
  }, [bookingDetails])

  if (!bookingDetails)
    return (
      <TransactionLayout title='There is no existing booking, please return to the previous page'>
        -
      </TransactionLayout>
    )

  return (
    <TransactionLayout title='Process Your Payment'>
      {paymentType === 'MANUAL_PAYMENT' ? (
        <ManualPayment bookingDetails={bookingDetails} />
      ) : paymentType === 'AUTOMATIC_PAYMENT' ? (
        <AutomaticPayment bookingDetails={bookingDetails} />
      ) : null}
      <PriceSummary
        roomId={roomId}
        propertyName={bookingDetails.propertyName}
        roomName={bookingDetails.roomName}
        city={bookingDetails.propertyCity}
        province={bookingDetails.propertyProvince}
        basePrice={bookingDetails.finalPrice}
        coverImage={bookingDetails.coverImage}
      />
    </TransactionLayout>
  )
}

export default PaymentProcess
