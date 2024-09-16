"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PriceSummary from "../_components/PriceSummary/PriceSummary";
import TransactionLayout from "../_components/TransactionLayout/TransactionLayout";
import PaymentOptions from "./_components/PaymentOptions/PaymentOptions";
import useBookingData from "@/hooks/booking/useBookingData";
import { useCheckExistingPendingBooking, useCreateBooking } from "@/hooks";

const PaymentMethod = () => {
  const params = useParams();
  const roomId = params.roomId as string;
  const router = useRouter();
  const userId = 11;

  const { bookingData, updateBookingData } = useBookingData(roomId);
  const { data: existingBookingId, isLoading } =
    useCheckExistingPendingBooking(userId, parseInt(roomId));
  const createBookingMutation = useCreateBooking();

  useEffect(() => {
    if (existingBookingId) {
      router.push(`/${roomId}/payment-process`);
    }
  }, [existingBookingId, roomId, router]);

  const handleMethodSelect = (
    methodId: string,
    specificPaymentMethod?: string
  ) => {
    updateBookingData("paymentMethod", methodId);
    if (specificPaymentMethod !== undefined) {
      updateBookingData("specificPaymentMethod", specificPaymentMethod);
    } else {
      updateBookingData("specificPaymentMethod", "");
    }
  };

  const handleCreateBooking = async () => {
    try {
      await createBookingMutation.mutateAsync({
        roomId: parseInt(roomId),
        userId: userId,
        checkInDate: bookingData.checkIn,
        checkOutDate: bookingData.checkOut,
        numGuests: bookingData.guestCount,
        paymentMethod: bookingData.paymentMethod,
        userMessage: bookingData.message,
      });
      router.push(`/${roomId}/payment-process`);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <TransactionLayout title="Select Payment Method">
      <PaymentOptions
        selectedMethod={bookingData.paymentMethod}
        selectedSpecificMethod={bookingData.specificPaymentMethod}
        onMethodSelect={handleMethodSelect}
        onCreateBooking={handleCreateBooking}
      />
      <PriceSummary
        roomId={roomId}
        propertyName="Beachfront Villa"
        roomName="Deluxe Ocean View"
        city="Bali"
        province="Indonesia"
        basePrice={1000000}
        coverImage="https://static.wikia.nocookie.net/adventuretimesuperfans/images/1/17/Ooo.jpg/revision/latest?cb=20120415202605"
      />
    </TransactionLayout>
  );
};

export default PaymentMethod;
