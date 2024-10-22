"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BookingSection from "./_components/BookingSection";
import SkeletonSection from "./_components/SkeletonSection";
import { BookingStatus, TenantBookings } from "@/types/booking";
import { useTenantBookings } from "@/hooks/booking/tenant/useTenantBookings";
import { PaymentStatus, PaymentType } from "@/types/payment";

const BookingList: React.FC = () => {
  const { isLoading, error, data: bookings } = useTenantBookings();
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <div>Error loading bookings. Please try again later.</div>;
  }

  const filterBookings = (
    bookings: TenantBookings[] | undefined
  ): TenantBookings[] => {
    if (!bookings) return [];
    if (!searchTerm) return bookings;

    return bookings.filter((booking) =>
      booking.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonSection />;
    }

    if (!bookings || bookings.length === 0) {
      return (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4">No Pending Bookings</h2>
          <p className="text-gray-600 mb-6">
            You don&apos;t have any bookings that require your attention at the
            moment.
          </p>
        </div>
      );
    }

    const filteredBookings = filterBookings(bookings);

    const awaitingConfirmationBookings = filteredBookings.filter(
      (booking) =>
        booking.status === BookingStatus.AWAITING_CONFIRMATION &&
        booking.paymentStatus === PaymentStatus.CONFIRMED
    );

    const manualPaymentBookings = filteredBookings.filter(
      (booking) =>
        booking.paymentType === PaymentType.MANUAL_PAYMENT &&
        booking.paymentStatus === PaymentStatus.AWAITING_CONFIRMATION
    );

    const awaitingPaymentFromGuest = filteredBookings.filter(
      (booking) =>
        booking.status === BookingStatus.PENDING_PAYMENT &&
        booking.paymentStatus === PaymentStatus.PENDING_PAYMENT
    );

    const confirmedBookings = filteredBookings.filter(
      (booking) => booking.status === BookingStatus.CONFIRMED
    );

    const cancelledBookings = filteredBookings.filter(
      (booking) => booking.status === BookingStatus.CANCELLED
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
        <BookingSection
          title="Awaiting Payment from the Guest"
          bookings={awaitingPaymentFromGuest}
          type="pending"
        />
        <BookingSection
          title="Confirmed Bookings"
          bookings={confirmedBookings}
          type="confirmed"
        />
        <BookingSection
          title="Cancelled Bookings"
          bookings={cancelledBookings}
          type="cancelled"
        />
      </>
    );
  };

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8">Booking Management</h1>
          <div className="relative w-full sm:w-96">
            <Input
              type="text"
              placeholder="Search by property name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        {renderContent()}
        <div className="absolute bottom-10 left-0 right-0 mx-10 h-[2px] bg-primary"></div>
      </div>
    </div>
  );
};

export default BookingList;
