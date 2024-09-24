"use client";

import { useParams, useRouter } from "next/navigation";
import InformationSummary from "./_components/InformationSummary/InformationSummary";
import PriceSummary from "../_components/PriceSummary/PriceSummary";
import TransactionLayout from "../_components/TransactionLayout/TransactionLayout";
import { useEffect } from "react";
import { useCheckExistingPendingBooking } from "@/hooks";

const BookingSummary = () => {
  const params = useParams();
  const roomId = params.roomId as string;
  const router = useRouter();

  const userId = 11;

  const { data: existingBookingId, isLoading } = useCheckExistingPendingBooking(
    userId,
    parseInt(roomId)
  );

  useEffect(() => {
    if (existingBookingId) {
      router.push(`/${roomId}/payment-process`);
    }
  }, []);

  return (
    <TransactionLayout title="Booking Summary">
      <InformationSummary roomId={roomId} />
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

export default BookingSummary;
