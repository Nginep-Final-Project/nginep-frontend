"use client";
import React from "react";
import { useParams } from "next/navigation";
import TransactionLayout from "../_components/TransactionLayout/TransactionLayout";
import PriceSummary from "../_components/PriceSummary/PriceSummary";
import useBookingData from "@/hooks/useBookingData";
import ManualPayment from "./_components/ManualPayment/ManualPayment";

const PaymentProcess = () => {
  const params = useParams();
  const roomId = params.roomId as string;
  const { bookingData } = useBookingData(roomId);

  return (
    <TransactionLayout title="Process Your Payment">
      {bookingData.paymentMethod === "manual_payment" ? (
        <ManualPayment roomId={roomId} basePrice={100} />
      ) : (
        <div>Automatic Payment Process (To be implemented)</div>
      )}
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

export default PaymentProcess;
