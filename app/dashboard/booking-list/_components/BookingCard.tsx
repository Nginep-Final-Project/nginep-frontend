import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { TenantBookings } from "@/types/booking";
import { useConfirmBooking } from "@/hooks/booking/tenant/useConfirmBooking";
import { useConfirmPayment } from "@/hooks/payment/useConfirmPayment";
import { useCancelBooking } from "@/hooks/booking/tenant/useCancelBooking";
import { useRejectPayment } from "@/hooks/payment/useRejectPayment";
import ConfirmationModal from "../../_components/Modal/ConfirmationModal";

interface BookingCardProps extends TenantBookings {
  type: "confirmation" | "payment" | "pending" | "cancelled" | "confirmed";
}

type ConfirmationAction =
  | "confirmBooking"
  | "confirmPayment"
  | "rejectPayment"
  | "cancelBooking";

const BookingCard: React.FC<BookingCardProps> = ({
  bookingId,
  roomId,
  paymentId,
  propertyName,
  checkInDate,
  checkOutDate,
  guestName,
  numGuests,
  roomName,
  finalPrice,
  status,
  paymentType,
  paymentStatus,
  proofOfPayment,
  propertyCoverImage,
  type,
}) => {
  const { mutate: confirmBooking } = useConfirmBooking();
  const { mutate: confirmPayment } = useConfirmPayment();
  const { mutate: cancelBooking } = useCancelBooking();
  const { mutate: rejectPayment } = useRejectPayment();
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    question: string;
    action: ConfirmationAction | null;
  }>({
    isOpen: false,
    title: "",
    question: "",
    action: null,
  });

  const formatDate = (dateString: string) =>
    format(new Date(dateString), "MMM d, yyyy");

  const openConfirmationModal = (action: ConfirmationAction) => {
    const config = {
      confirmBooking: {
        title: "Confirm the Booking",
        question: "Are you sure you want to confirm the booking?",
      },
      confirmPayment: {
        title: "Verify Payment",
        question: "Are you sure you want to verify this payment?",
      },
      rejectPayment: {
        title: "Reject Payment",
        question: "Are you sure you want to reject this payment?",
      },
      cancelBooking: {
        title: "Cancel Reservation",
        question: "Are you sure you want to cancel this reservation?",
      },
    };

    setModalConfig({
      isOpen: true,
      ...config[action],
      action,
    });
  };

  const handleConfirmAction = () => {
    switch (modalConfig.action) {
      case "confirmBooking":
        confirmBooking(bookingId);
        break;
      case "confirmPayment":
        confirmPayment(paymentId);
        break;
      case "rejectPayment":
        rejectPayment(paymentId);
        break;
      case "cancelBooking":
        cancelBooking(bookingId);
        break;
    }
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-xl border">
        <div className="w-full sm:w-1/2 p-4">
          <h3 className="text-xl font-semibold mb-1">{propertyName}</h3>
          <p className="text-gray-600 mb-2">
            {formatDate(checkInDate)} – {formatDate(checkOutDate)}
          </p>
          <p className="text-sm text-gray-600 mb-1">Room: {roomName}</p>
          <p className="text-sm text-gray-600 mb-1">Guests: {numGuests}</p>
          <p className="text-sm text-gray-600 mb-4">Booked by: {guestName}</p>
          <p className="text-lg font-semibold mb-4">
            Total: IDR {finalPrice.toFixed(2)}
          </p>
          {type === "confirmation" && (
            <div className="flex flex-col items-start space-y-2 mb-4">
              <Button
                onClick={() => openConfirmationModal("confirmBooking")}
                className="w-60 bg-green-700 hover:bg-green-500"
              >
                Confirm Reservation
              </Button>
            </div>
          )}
          {type === "payment" && (
            <>
              <div className="flex flex-col items-start space-y-2 mb-4">
                <Button
                  onClick={() => openConfirmationModal("confirmPayment")}
                  className="w-60 bg-green-700 hover:bg-green-500"
                >
                  Verify Payment
                </Button>
                <Button
                  onClick={() => openConfirmationModal("rejectPayment")}
                  className="w-60"
                >
                  Reject Payment
                </Button>
                {proofOfPayment && (
                  <div className="">
                    <a
                      href={proofOfPayment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Proof of Payment
                    </a>
                  </div>
                )}
              </div>
            </>
          )}

          {type !== "cancelled" && type !== "confirmed" && (
            <Button
              onClick={() => openConfirmationModal("cancelBooking")}
              className="w-60"
            >
              Cancel Reservation
            </Button>
          )}
        </div>
        <div className="relative w-full sm:w-1/2 h-48 sm:h-auto">
          <Image
            src={propertyCoverImage}
            alt={`${propertyName} image`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <ConfirmationModal
          title={modalConfig.title}
          question={modalConfig.question}
          isOpen={modalConfig.isOpen}
          onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
          onConfirm={handleConfirmAction}
        />
      </div>
    </>
  );
};

export default BookingCard;
