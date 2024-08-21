"use client";

import React from "react";
import { useParams } from "next/navigation";
import PriceSummary from "../_components/PriceSummary/PriceSummary";
import useBookingData from "@/hooks/useBookingData";
import TransactionLayout from "../_components/TransactionLayout/TransactionLayout";
import PaymentMethods from "./_components/PaymentMethods";

const PaymentMethod = () => {
  const params = useParams();
  const roomId = params.roomId as string;
  const { bookingData, updateBookingData } = useBookingData(roomId);

  const handleMethodSelect = (methodId: string) => {
    updateBookingData("paymentMethod", methodId);
  };

  return (
    <TransactionLayout title="Select Payment Method">
      <PaymentMethods
        selectedMethod={bookingData.paymentMethod}
        onMethodSelect={handleMethodSelect}
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
