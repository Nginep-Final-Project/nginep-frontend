import React, { useState } from "react";
import CancelConfirmationModal from "./CancelConfirmationModal";
import { useCancelBooking } from "@/hooks/booking/user/useCancelBooking";

interface CancelBookingButtonProps {
  bookingId: number;
}

const CancelBookingButton: React.FC<CancelBookingButtonProps> = ({
  bookingId,
}) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const { mutate: cancelBooking, isPending } = useCancelBooking();

  const handleCancelBooking = () => {
    setIsCancelModalOpen(true);
  };

  const confirmCancelBooking = () => {
    cancelBooking(bookingId);
    setIsCancelModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleCancelBooking}
        className="px-2 py-1 text-xs w-full text-center sm:w-80 sm:text-left rounded-lg text-white bg-primary cursor-pointer"
      >
        Cancel Booking and Abort the Payment Process
      </div>
      <CancelConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={confirmCancelBooking}
        isPending={isPending}
      />
    </>
  );
};

export default CancelBookingButton;
