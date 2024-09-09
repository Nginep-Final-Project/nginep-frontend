import React from "react";
import BookingCard from "./BookingCard";
import { UserBookingList } from "@/types/userBookingList";

interface BookingSectionProps {
  title: string;
  bookings: UserBookingList[];
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
          <BookingCard key={booking.id} {...booking} />
        ))}
      </div>
    </section>
  );
};

export default BookingSection;
