"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ManualPayment from "./_components/ManualPayment/ManualPayment";
import AutomaticPayment from "./_components/AutomaticPayment/AutomaticPayment";
import PriceSummary from "../_components/PriceSummary/PriceSummary";
import TransactionLayout from "../_components/TransactionLayout/TransactionLayout";
import {
  useBookingPaymentDetails,
  useCheckExistingPendingBooking,
} from "@/hooks";
import { useSession } from "next-auth/react";

const PaymentProcess = () => {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const [paymentType, setPaymentType] = useState<
    "MANUAL_PAYMENT" | "AUTOMATIC_PAYMENT" | null
  >(null);

  const { data: session } = useSession();

  const userIdString = session?.user?.id;
  const userId = userIdString ? parseInt(userIdString, 10) : undefined;

  if (userId === undefined || isNaN(userId)) {
    return <div>Please log in to see your payment details</div>;
  }

  const { data: existingBookingId, isLoading: isCheckingBooking } =
    useCheckExistingPendingBooking(userId, parseInt(roomId));
  const {
    data: bookingDetails,
    isLoading: isLoadingDetails,
    error,
  } = useBookingPaymentDetails(existingBookingId);

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

  if (!bookingDetails)
    return <div className="min-h-screen"></div>;

  return (
    <TransactionLayout title="Process Your Payment">
      {paymentType === "MANUAL_PAYMENT" ? (
        <ManualPayment bookingDetails={bookingDetails} />
      ) : paymentType === "AUTOMATIC_PAYMENT" ? (
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
  );
};

export default PaymentProcess;
