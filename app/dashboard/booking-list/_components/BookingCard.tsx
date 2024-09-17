import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TenantBooking } from "@/types/tenantBookings";
import { useConfirmBooking } from "@/hooks/booking/tenant/useConfirmBooking";
import { useConfirmPayment } from "@/hooks/booking/tenant/useConfirmPayment";

interface BookingCardProps extends TenantBooking {
  type: "confirmation" | "payment";
}

const BookingCard: React.FC<BookingCardProps> = ({
  bookingId,
  roomId,
  propertyName,
  checkInDate,
  checkOutDate,
  guestName,
  numGuests,
  roomName,
  finalPrice,
  proofOfPayment,
  type,
}) => {
  const { mutate: confirmBooking } = useConfirmBooking();
  const { mutate: confirmPayment } = useConfirmPayment();

  const formatDate = (dateString: string) =>
    format(new Date(dateString), "MMM d, yyyy");

  const handleConfirmBooking = () => {
    confirmBooking(bookingId);
  };

  const handleConfirmPayment = () => {
    confirmPayment(bookingId);
  };

  return (
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
          Total: ${finalPrice.toFixed(2)}
        </p>
        {type === "confirmation" && (
          <Button onClick={handleConfirmBooking}>Confirm Reservation</Button>
        )}
        {type === "payment" && (
          <>
            <Button onClick={handleConfirmPayment}>
              Verify Payment & Confirm
            </Button>
            {proofOfPayment && (
              <div className="mt-2">
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
          </>
        )}
      </div>
      <div className="relative w-full sm:w-1/2 h-48 sm:h-auto">
        <Image
          src={`/api/room-image/${roomId}`}
          alt={`${propertyName} image`}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default BookingCard;
