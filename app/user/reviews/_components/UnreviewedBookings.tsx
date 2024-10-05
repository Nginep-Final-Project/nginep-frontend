import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { UnreviewedBookingDto } from "@/types/booking";

interface UnreviewedBookingsProps {
  bookings: UnreviewedBookingDto[];
  onSelectBooking: (bookingId: number) => void;
}

const UnreviewedBookings: React.FC<UnreviewedBookingsProps> = ({
  bookings,
  onSelectBooking,
}) => {
  const formatDate = (date: string) => {
    return format(new Date(date), "dd MMM yyyy");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Bookings to Review</h2>
      {bookings.map((booking) => (
        <Card
          key={booking.id}
          className="flex flex-col sm:flex-row bg-white rounded-lg shadow-xl border"
        >
          <div className="w-full sm:w-1/2 p-4">
            <CardHeader>
              <CardTitle>{booking.propertyName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-2">Room: {booking.roomName}</p>
              <p>Check-in: {formatDate(booking.checkInDate)}</p>
              <p className="mb-4">
                Check-out: {formatDate(booking.checkOutDate)}
              </p>
              <Button
                onClick={() => onSelectBooking(booking.id)}
                className="mt-2"
              >
                Write a Review
              </Button>
            </CardContent>
          </div>

          <div className="relative w-full sm:w-1/2 h-48 sm:h-auto">
            <Image
              className="rounded-b-lg sm:rounded-none sm:rounded-r-lg "
              src={booking.propertyCoverImage}
              alt={`${booking.propertyName} image`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UnreviewedBookings;
