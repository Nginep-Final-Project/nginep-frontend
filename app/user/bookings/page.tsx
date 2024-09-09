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
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          Your Bookings
        </h1>
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
        <div className="absolute bottom-10 left-0 right-0 mx-10 h-[2px] bg-primary"></div>
      </div>
    </div>
  );
};

export default Bookings;
