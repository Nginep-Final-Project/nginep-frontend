import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCreateBooking } from "@/hooks";
import useBookingData from "@/hooks/booking/useBookingData";
import ValidatedNavigation from "./ValidatedNavigation";
import Button from "../Button/Button";
import { BookingData } from "@/types/bookingData";
import { clearBookingData } from "@/utils/localStorage";

interface BookingNavigationButtonProps {
  to: string;
  requiredFields: (keyof BookingData)[];
  children: React.ReactNode;
}

const BookingNavigationButton: React.FC<BookingNavigationButtonProps> = ({
  to,
  requiredFields,
  children,
}) => {
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId as string;
  const createBookingMutation = useCreateBooking();
  const { bookingData } = useBookingData(roomId);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);

  const handleCreateBooking = async () => {
    if (isCreatingBooking) return;

    setIsCreatingBooking(true);
    try {
      await createBookingMutation.mutateAsync({
        roomId: parseInt(roomId),
        userId: 11,
        checkInDate: bookingData.checkIn,
        checkOutDate: bookingData.checkOut,
        numGuests: bookingData.guestCount,
        paymentMethod: bookingData.paymentMethod,
        userMessage: bookingData.message,
      });
      clearBookingData(roomId);

      const fullPath = `/${roomId}${to}`;
      router.push(fullPath);
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsCreatingBooking(false);
    }
  };

  return (
    <Button onClick={handleCreateBooking} disabled={isCreatingBooking}>
      {children}
    </Button>
  );
};

export default BookingNavigationButton;
