"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InformationSummary from "./_components/InformationSummary/InformationSummary";
import { useCheckExistingPendingBooking, useCreateBooking } from "@/hooks";
import { RESERVE_BOOKING_DATA } from "@/utils/constanta";
import { SelectedRoom } from "@/app/(main)/property/[propertyId]/_components/DetailProperty";
import { PaymentType } from "@/types/payment";
import TransactionLayout from "../_components/TransactionLayout/TransactionLayout";
import PaymentOptions from "./_components/PaymentOptions/PaymentOptions";
import PriceSummary from "../_components/PriceSummary/PriceSummary";
import WarningModal from "../_components/Modal/WarningModal";
import useWarningModal from "@/hooks/common/useWarningModal";
import { useSession } from "next-auth/react";

interface ExtendedSelectedRoom extends SelectedRoom {
  paymentMethod: PaymentType;
  userMessage?: string;
  bank?: string;
  totalNights: number;
}

const BookingSummary: React.FC = () => {
  const params = useParams();
  const roomId = params.roomId as string;
  const router = useRouter();
  const [reserveBooking, setReserveBooking] = useState<
    ExtendedSelectedRoom | undefined
  >();
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>(
    PaymentType.MANUAL_PAYMENT
  );
  const [specificPaymentMethod, setSpecificPaymentMethod] = useState("");
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const { showWarning, closeWarning, openWarning } = useWarningModal();

  const { data: existingBookingId, isLoading } = useCheckExistingPendingBooking(
    parseInt(roomId)
  );

  const createBookingMutation = useCreateBooking();

  useEffect(() => {
    if (existingBookingId) {
      router.push(`/${roomId}/payment-process`);
    }
    const storedReserveBooking = localStorage.getItem(RESERVE_BOOKING_DATA);
    if (storedReserveBooking) {
      const parsedStoredData = JSON.parse(
        storedReserveBooking
      ) as ExtendedSelectedRoom;
      setReserveBooking(parsedStoredData);
      setPaymentMethod(
        parsedStoredData.paymentMethod || PaymentType.MANUAL_PAYMENT
      );
      setSpecificPaymentMethod(parsedStoredData.bank || "");
    }
  }, [existingBookingId, roomId, router]);

  const updateLocalStorage = (updatedData: Partial<ExtendedSelectedRoom>) => {
    if (reserveBooking) {
      const updatedReserveBooking: ExtendedSelectedRoom = {
        ...reserveBooking,
        ...updatedData,
        paymentMethod:
          updatedData.paymentMethod || reserveBooking.paymentMethod,
      };
      localStorage.setItem(
        RESERVE_BOOKING_DATA,
        JSON.stringify(updatedReserveBooking)
      );
      setReserveBooking(updatedReserveBooking);
    }
  };

  const handleMethodSelect = (
    methodId: PaymentType,
    specificMethod?: string
  ) => {
    setPaymentMethod(methodId);
    setSpecificPaymentMethod(specificMethod || "");
    updateLocalStorage({
      paymentMethod: methodId,
      bank:
        methodId === PaymentType.AUTOMATIC_PAYMENT ? specificMethod : undefined,
    });
  };

  const handleCreateBooking = async () => {
    if (!reserveBooking || isCreatingBooking) return;

    const requiredFields = [
      "guests",
      "checkInDate",
      "checkOutDate",
      "paymentMethod",
    ];
    if (paymentMethod === PaymentType.AUTOMATIC_PAYMENT) {
      requiredFields.push("bank");
    }

    const missingFields = requiredFields.filter(
      (field) => !reserveBooking[field as keyof ExtendedSelectedRoom]
    );

    if (missingFields.length > 0) {
      openWarning();
      return;
    }

    setIsCreatingBooking(true);
    try {
      const bookingData = {
        roomId: parseInt(roomId),
        checkInDate: reserveBooking.checkInDate,
        checkOutDate: reserveBooking.checkOutDate,
        numGuests: reserveBooking.guests,
        paymentMethod: reserveBooking.paymentMethod,
        userMessage: reserveBooking.userMessage,
        bank:
          paymentMethod === PaymentType.AUTOMATIC_PAYMENT
            ? specificPaymentMethod
            : undefined,
      };

      await createBookingMutation.mutateAsync(bookingData);
      localStorage.removeItem(RESERVE_BOOKING_DATA);
      router.push(`/${roomId}/payment-process`);
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsCreatingBooking(false);
    }
  };

  if (!reserveBooking) {
    return <div>Loading...</div>;
  }

  return (
    <TransactionLayout title="Booking Summary & Payment">
      <div className="w-full lg:w-2/3">
        <InformationSummary roomId={roomId} />
        <PaymentOptions
          selectedMethod={paymentMethod}
          selectedSpecificMethod={specificPaymentMethod}
          onMethodSelect={handleMethodSelect}
          onCreateBooking={handleCreateBooking}
          isCreatingBooking={isCreatingBooking}
        />
      </div>
      <PriceSummary
        propertyName={reserveBooking.property.propertyName}
        roomName={reserveBooking.roomType}
        city={reserveBooking.property.propertyCity}
        province={reserveBooking.property.propertyProvince}
        pricePerNight={reserveBooking.pricePerNight}
        totalNights={reserveBooking.totalNights}
        coverImage={reserveBooking.property.propertyImage[0]?.path || ""}
        numberOfGuest={reserveBooking.guests}
        checkInDate={reserveBooking.checkInDate}
        checkOutDate={reserveBooking.checkOutDate}
      />
      <WarningModal
        isOpen={showWarning}
        onClose={closeWarning}
        title="Check Inputs"
        message="Please ensure to fill out all required fields before proceeding."
      />
    </TransactionLayout>
  );
};

export default BookingSummary;
