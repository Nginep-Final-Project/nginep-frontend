"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ManualPayment from "./_components/ManualPayment";
import AutomaticPayment from "./_components/AutomaticPayment";
import PriceSummary from "../_components/PriceSummary/PriceSummary";
import TransactionLayout from "../_components/TransactionLayout/TransactionLayout";
import { differenceInDays } from "date-fns";
import { useCheckExistingPendingBooking } from "@/hooks/booking/useCheckExistingPendingBooking";
import { useBookingPaymentDetails } from "@/hooks/booking/useBookingPaymentDetails";
import Link from "next/link";
import { decodeRoomId } from "@/utils/idEncoder";

const PaymentProcess = () => {
  const params = useParams();
  const encodedRoomId = params.roomId as string;
  const roomId = decodeRoomId(encodedRoomId);
  const [paymentType, setPaymentType] = useState<
    "MANUAL_PAYMENT" | "AUTOMATIC_PAYMENT" | null
  >(null);
  const [retryCount, setRetryCount] = useState(0);

  const {
    data: existingBookingId,
    isLoading: isCheckingBooking,
    refetch: refetchExistingBooking,
  } = useCheckExistingPendingBooking(roomId);

  const {
    data: bookingDetails,
    isLoading: isLoadingDetails,
    error,
  } = useBookingPaymentDetails(existingBookingId);

  useEffect(() => {
    if (!existingBookingId && !isCheckingBooking && retryCount < 3) {
      const timer = setTimeout(() => {
        refetchExistingBooking();
        setRetryCount((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [
    existingBookingId,
    isCheckingBooking,
    retryCount,
    refetchExistingBooking,
  ]);

  const totalNights = useMemo(() => {
    if (bookingDetails) {
      const checkInDate = new Date(bookingDetails.checkInDate);
      const checkOutDate = new Date(bookingDetails.checkOutDate);
      return differenceInDays(checkOutDate, checkInDate);
    }
    return 0;
  }, [bookingDetails]);

  useEffect(() => {
    if (bookingDetails) {
      setPaymentType(
        bookingDetails.paymentType === "MANUAL_PAYMENT"
          ? "MANUAL_PAYMENT"
          : "AUTOMATIC_PAYMENT"
      );
    }
  }, [bookingDetails]);

  if (isCheckingBooking) {
    return (
      <TransactionLayout title="Checking Existing Booking">
        Please wait while we check your current booking.
      </TransactionLayout>
    );
  }

  if (!bookingDetails)
    return (
      <TransactionLayout title="You currently have no reservation">
        <div>
          Please make a reservation on the property/room page before going here.
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            <p>Go to the home page</p>
          </Link>
        </div>
      </TransactionLayout>
    );

  return (
    <TransactionLayout title="Process Your Payment">
      {paymentType === "MANUAL_PAYMENT" ? (
        <ManualPayment bookingDetails={bookingDetails} />
      ) : paymentType === "AUTOMATIC_PAYMENT" ? (
        <AutomaticPayment bookingDetails={bookingDetails} />
      ) : null}
      <PriceSummary
        propertyName={bookingDetails.propertyName}
        roomName={bookingDetails.roomName}
        city={bookingDetails.propertyCity}
        province={bookingDetails.propertyProvince}
        pricePerNight={bookingDetails.basePrice}
        totalNights={totalNights}
        coverImage={bookingDetails.coverImage}
        numberOfGuest={bookingDetails.numGuests}
        checkInDate={bookingDetails.checkInDate}
        checkOutDate={bookingDetails.checkOutDate}
      />
    </TransactionLayout>
  );
};

export default PaymentProcess;
