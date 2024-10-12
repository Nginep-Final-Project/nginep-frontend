import React from "react";
import BookingCard from "./BookingCard";
import { UserBookings } from "@/types/booking";

interface BookingSectionProps {
  title: string;
  bookings: UserBookings[];
}

const BookingSection: React.FC<BookingSectionProps> = ({ title, bookings }) => {
  if (bookings.length === 0) {
    return null;
  }

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <BookingCard key={booking.bookingId} {...booking} />
        ))}
      </div>
    </section>
  );
};

export default BookingSection;
