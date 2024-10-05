import React from "react";
import BookingCard from "./BookingCard";
import { TenantBookings } from "@/types/booking";

interface BookingSectionProps {
  title: string;
  bookings: TenantBookings[];
  type: "confirmation" | "payment" | "pending" | "cancelled" | "confirmed";
}

const BookingSection: React.FC<BookingSectionProps> = ({ title, bookings, type }) => {
  if (bookings.length === 0) {
    return null;
  }

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <BookingCard key={booking.bookingId} {...booking} type={type} />
        ))}
      </div>
    </section>
  );
};

export default BookingSection;