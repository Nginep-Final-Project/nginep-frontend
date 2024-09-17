import axios from "axios";
import { UserBookings } from "@/types/userBookings";
import { BookingPaymentDetails } from "@/types/bookingPaymentDetails";
import { CreateBookingDto } from "@/types/createBookingDto";
import { TenantBooking } from "@/types/tenantBookings";

export const createBooking = async (
  bookingData: CreateBookingDto
): Promise<number> => {
  try {
    const response = await axios.post<{ data: { bookingId: number } }>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/create`,
      bookingData
    );
    return response.data.data.bookingId;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const checkExistingPendingBooking = async (
  userId: number,
  roomId: number
): Promise<number | null> => {
  try {
    const response = await axios.get<{ data: number | null }>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/check-existing-pending-booking`,
      { params: { userId, roomId } }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error checking existing pending booking:", error);
    throw error;
  }
};

export const getUserBookings = async (
  userId: number
): Promise<UserBookings[]> => {
  try {
    const response = await axios.get<{ data: UserBookings[] }>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/user/${userId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};

export const getBookingPaymentDetails = async (
  bookingId: number
): Promise<BookingPaymentDetails> => {
  try {
    const response = await axios.get<{ data: BookingPaymentDetails }>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/${bookingId}/payment-details`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching booking payment details:", error);
    throw error;
  }
};

export const cancelBookingByUser = async (bookingId: number): Promise<void> => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/${bookingId}/cancel/user`
    );
    return response.data;
  } catch (error) {
    console.error("Error cancelling the booking:", error);
    throw error;
  }
};

export const getTenantBookings = async (
  tenantId: number
): Promise<TenantBooking[]> => {
  const response = await axios.get<TenantBooking[]>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/tenant/${tenantId}`
  );
  return response.data;
};

export const confirmBooking = async (bookingId: number): Promise<void> => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/${bookingId}/confirm`
  );
};

export const confirmPayment = async (bookingId: number): Promise<void> => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/bookings/${bookingId}/confirm-payment`
  );
};
