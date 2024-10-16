"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InformationSummary from "./_components/InformationSummary/InformationSummary";
import { RESERVE_BOOKING_DATA } from "@/utils/constanta";
import { SelectedRoom } from "@/app/(main)/property/[propertyId]/_components/DetailProperty";
import { PaymentType } from "@/types/payment";
import TransactionLayout from "../_components/TransactionLayout/TransactionLayout";
import PaymentOptions from "./_components/PaymentOptions/PaymentOptions";
import PriceSummary from "../_components/PriceSummary/PriceSummary";
import WarningModal from "../_components/Modal/WarningModal";
import useWarningModal from "@/hooks/common/useWarningModal";
import { useCheckExistingPendingBooking } from "@/hooks/booking/useCheckExistingPendingBooking";
import { useCreateBooking } from "@/hooks/booking/useCreateBooking";
import Link from "next/link";
import { decodeRoomId } from "@/utils/idEncoder";
import BookingCreationModal from "./_components/Modal/BookingCreationModal";
import BookingSummaryLoadingScreen from "./_components/Loading/BookingSummaryLoadingScreen";
import { AxiosError } from "axios";
import { response } from "@/types/response";

interface ExtendedSelectedRoom extends SelectedRoom {
  paymentMethod: PaymentType;
  userMessage?: string;
  bank?: string;
  totalNights: number;
}

const BookingSummary: React.FC = () => {
  const params = useParams();
  const encodedRoomId = params.roomId as string;
  const roomId = decodeRoomId(encodedRoomId);
  const router = useRouter();
  const [reserveBooking, setReserveBooking] = useState<
    ExtendedSelectedRoom | undefined
  >();
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>(
    PaymentType.MANUAL_PAYMENT
  );
  const [specificPaymentMethod, setSpecificPaymentMethod] = useState("");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { showWarning, closeWarning, openWarning } = useWarningModal();

  const { data: existingBookingId, isLoading: isCheckingBooking } =
    useCheckExistingPendingBooking(roomId);

  const {
    mutate: createBookingMutation,
    isPending: isCreatingBooking,
    isSuccess: isBookingSuccess,
    isError: isBookingError,
    error: bookingError,
  } = useCreateBooking();

  useEffect(() => {
    const storedReserveBooking = localStorage.getItem(RESERVE_BOOKING_DATA);
    if (storedReserveBooking) {
      const parsedStoredData = JSON.parse(
        storedReserveBooking
      ) as ExtendedSelectedRoom;
      setReserveBooking({
        ...parsedStoredData,
        paymentMethod: PaymentType.MANUAL_PAYMENT,
      });
      setPaymentMethod(PaymentType.MANUAL_PAYMENT);
      setSpecificPaymentMethod(parsedStoredData.bank || "");
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (existingBookingId) {
      router.push(`/${encodedRoomId}/payment-process`);
    }
  }, [existingBookingId, encodedRoomId, router]);

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

    setIsBookingModalOpen(true);

    const bookingData = {
      roomId: roomId,
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

    createBookingMutation(bookingData);
  };

  const handleBookingComplete = () => {
    localStorage.removeItem(RESERVE_BOOKING_DATA);
    router.push(`/${encodedRoomId}/payment-process`);
  };

  const getErrorMessage = (error: unknown): string | null => {
    if (error instanceof AxiosError && error.response) {
      const apiError = error.response.data as response;
      return apiError.data || apiError.message;
    }
    return "An unexpected error occurred while creating the booking";
  };

  if (!reserveBooking) {
    if (isLoading) {
      return (
        <TransactionLayout title="Preparing Booking Summary">
          <BookingSummaryLoadingScreen />
        </TransactionLayout>
      );
    }

    if (!isCheckingBooking) {
      return (
        <TransactionLayout title="You currently have no reservation">
          <div>
            You currently don&apos;t have a data reservation. Please return to
            the property details and its room page to find the suitable date.{" "}
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              <p>Go to the home page</p>
            </Link>
          </div>
        </TransactionLayout>
      );
    }
  }

  return (
    <TransactionLayout title="Booking Summary & Payment">
      <div className="w-full lg:w-2/3">
        <InformationSummary />
        <PaymentOptions
          selectedMethod={paymentMethod}
          selectedSpecificMethod={specificPaymentMethod}
          onMethodSelect={handleMethodSelect}
          onCreateBooking={handleCreateBooking}
          isCreatingBooking={isCreatingBooking}
        />
      </div>
      {reserveBooking && (
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
      )}
      <WarningModal
        isOpen={showWarning}
        onClose={closeWarning}
        title="Check Inputs"
        message="Please ensure to fill out all required fields before proceeding."
      />
      <BookingCreationModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          if (!isCreatingBooking && !isBookingSuccess) {
            setIsBookingModalOpen(false);
          }
        }}
        onComplete={handleBookingComplete}
        isCreating={isCreatingBooking}
        isSuccess={isBookingSuccess}
        error={isBookingError ? getErrorMessage(bookingError) : null}
      />
    </TransactionLayout>
  );
};

export default BookingSummary;
