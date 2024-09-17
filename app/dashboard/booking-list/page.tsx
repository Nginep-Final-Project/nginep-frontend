"use client";

import React from "react";
import BookingSection from "./_components/BookingSection";
import SkeletonSection from "./_components/SkeletonSection";
import { BookingStatus } from "@/types/tenantBookings";
import { useTenantBookings } from "@/hooks/booking/tenant/useTenantBookings";

const BookingList: React.FC = () => {
  const tenantId = 1;

  const { isLoading, error, data: bookings } = useTenantBookings(tenantId);

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
          <h2 className="text-2xl font-semibold mb-4">No Pending Bookings</h2>
          <p className="text-gray-600 mb-6">
            You don't have any bookings that require your attention at the
            moment.
          </p>
        </div>
      );
    }

    const awaitingConfirmationBookings = bookings.filter(
      (booking) => booking.status === BookingStatus.AWAITING_CONFIRMATION
    );

    const manualPaymentBookings = bookings.filter(
      (booking) =>
        booking.paymentType === "MANUAL_PAYMENT" &&
        booking.paymentStatus === "AWAITING_CONFIRMATION"
    );

    return (
      <>
        <BookingSection
          title="Reservations Awaiting Approval"
          bookings={awaitingConfirmationBookings}
          type="confirmation"
        />
        <BookingSection
          title="Manual Payments to Verify"
          bookings={manualPaymentBookings}
          type="payment"
        />
      </>
    );
  };

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          Booking Management
        </h1>
        {renderContent()}
        <div className="absolute bottom-10 left-0 right-0 mx-10 h-[2px] bg-primary"></div>
      </div>
    </div>
  );
};

export default BookingList;
