"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ManualPayment from "./_components/ManualPayment/ManualPayment";
import AutomaticPayment from "./_components/AutomaticPayment/AutomaticPayment";
import PriceSummary from "../_components/PriceSummary/PriceSummary";
import TransactionLayout from "../_components/TransactionLayout/TransactionLayout";
import {
  useBookingPaymentDetails,
  useCheckExistingPendingBooking,
} from "@/hooks";
import { differenceInDays } from "date-fns";

const PaymentProcess = () => {
  const params = useParams();
  const roomId = params.roomId as string;
  const [paymentType, setPaymentType] = useState<
    "MANUAL_PAYMENT" | "AUTOMATIC_PAYMENT" | null
  >(null);

  const { data: existingBookingId, isLoading: isCheckingBooking } =
    useCheckExistingPendingBooking(parseInt(roomId));
  const {
    data: bookingDetails,
    isLoading: isLoadingDetails,
    error,
  } = useBookingPaymentDetails(existingBookingId);

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

  if (isLoadingDetails)
    return <TransactionLayout title="Loading..."> </TransactionLayout>;

  if (!bookingDetails) return <div className="min-h-screen"></div>;

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
