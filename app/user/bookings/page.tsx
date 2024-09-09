// app/user/bookings/page.tsx
"use client";

import React from "react";
import BookingSection from "./_components/BookingSection";
import useBookings from "@/hooks/useBookingSection";

const Bookings: React.FC = () => {
  const {
    bookings,
    getTomorrowBookings,
    getUpcomingBookings,
    getAwaitingConfirmationBookings,
    getAwaitingPaymentBookings,
    getCancelledBookings,
  } = useBookings();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Bookings</h1>
        <BookingSection
          title="Tomorrow"
          bookings={getTomorrowBookings(bookings)}
        />
        <BookingSection
          title="Upcoming Reservations"
          bookings={getUpcomingBookings(bookings)}
        />
        <BookingSection
          title="Awaiting Host Confirmation"
          bookings={getAwaitingConfirmationBookings(bookings)}
        />
        <BookingSection
          title="Awaiting Your Payment"
          bookings={getAwaitingPaymentBookings(bookings)}
        />
        <BookingSection
          title="Cancelled"
          bookings={getCancelledBookings(bookings)}
        />
      </div>
    </div>
  );
};

export default Bookings;
