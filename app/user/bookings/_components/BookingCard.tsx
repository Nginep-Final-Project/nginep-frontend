import React, { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { UserBookings } from "@/types/booking";
import { mapBookingStatus } from "@/utils/bookingStatusMapper";
import CancelConfirmationModal from "./CancelConfirmationModal";
import { useCancelBooking } from "@/hooks/booking/user/useCancelBooking";
import { encodeRoomId } from "@/utils/idEncoder";

const BookingCard: React.FC<UserBookings> = ({
  bookingId,
  roomId,
  propertyId,
  propertyName,
  checkInDate,
  checkOutDate,
  hostName,
  propertyAddress,
  propertyCity,
  propertyProvince,
  propertyCoverImage,
  status,
  numGuests,
  roomName,
}) => {
  const { mutate: cancelBooking, isPending, error } = useCancelBooking();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const formatDate = (dateString: string) =>
    format(new Date(dateString), "MMM d");
  const formatYear = (dateString: string) =>
    format(new Date(dateString), "yyyy");

  const displayStatus = mapBookingStatus(status);

  const handleCancelBooking = () => {
    setIsCancelModalOpen(true);
  };

  const confirmCancelBooking = () => {
    cancelBooking(bookingId);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden">
        <div className="w-full sm:w-1/2 p-4">
          <h3 className="text-xl font-semibold mb-1">
            {propertyName} in {propertyProvince}
          </h3>
          <p className="text-gray-600 mb-2 font-medium">
            {formatDate(checkInDate)} – {formatDate(checkOutDate)},{" "}
            {formatYear(checkOutDate)}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            {propertyAddress}, {propertyCity}
          </p>
          <p className="text-sm text-gray-600 mb-1">Room: {roomName}</p>
          <p className="text-sm text-gray-600 mb-1">Guests: {numGuests}</p>
          <p className="text-sm text-gray-600 mt-4">Hosted by {hostName}</p>
        </div>
        <div className="relative w-full sm:w-1/2 h-48 sm:h-auto">
          <Link href={`/property/${propertyId}`}>
            <Image
              src={propertyCoverImage}
              alt={`${propertyName} image`}
              layout="fill"
              objectFit="cover"
            />
          </Link>

          <div className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full bg-white bg-opacity-80">
            {displayStatus}
          </div>
          {status === "PENDING_PAYMENT" && (
            <>
              <Link href={`/${encodeRoomId(roomId)}/payment-process`}>
                <div className="absolute bottom-11 right-3 md:bottom-3 md:left-3 md:right-auto px-2 py-1 text-xs font-semibold rounded-full text-black bg-green-300 bg-opacity-80 cursor-pointer">
                  Check Payment Details
                </div>
              </Link>
              <div
                onClick={handleCancelBooking}
                className="absolute bottom-3 right-3 px-2 py-1 text-xs font-semibold rounded-full text-white bg-primary cursor-pointer"
              >
                Cancel Booking
              </div>
            </>
          )}
        </div>
        <CancelConfirmationModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={confirmCancelBooking}
        />
      </div>
    </>
  );
};

export default BookingCard;
