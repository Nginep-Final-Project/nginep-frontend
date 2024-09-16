"use client";

import React from "react";
import BookingSection from "./_components/BookingSection";
import SkeletonSection from "./_components/SkeletonSection";
import Link from "next/link";
import { useUserBookings } from "@/hooks/booking/useUserBookings";

const Bookings: React.FC = () => {
  const userId = 11;

  const {
    isLoading,
    error,
    data: bookings,
    getTomorrowBookings,
    getUpcomingBookings,
    getAwaitingConfirmationBookings,
    getAwaitingPaymentBookings,
    getCancelledBookings,
  } = useUserBookings(userId);

  if (error) {
    return <div>Error loading bookings. Please try again later.</div>;
  }

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonSection />;
    }

    if (!bookings || bookings.length === 0) {
      return (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">No Reservations Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't made any reservations. Ready to plan your next
            adventure?
          </p>
          <Link
            href="/"
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            Explore Popular Properties
          </Link>
        </div>
      );
    }

    return (
      <>
        <BookingSection
          title="Get Ready for Tomorrow"
          bookings={getTomorrowBookings()}
        />
        <BookingSection
          title="Upcoming Reservations"
          bookings={getUpcomingBookings()}
        />
        <BookingSection
          title="Awaiting Host Confirmation"
          bookings={getAwaitingConfirmationBookings()}
        />
        <BookingSection
          title="Awaiting Your Payment"
          bookings={getAwaitingPaymentBookings()}
        />
        <BookingSection title="Cancelled" bookings={getCancelledBookings()} />
      </>
    );
  };

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          Your Reservations
        </h1>
        {renderContent()}
        <div className="absolute bottom-10 left-0 right-0 mx-10 h-[2px] bg-primary"></div>
      </div>
    </div>
  );
};

export default Bookings;
