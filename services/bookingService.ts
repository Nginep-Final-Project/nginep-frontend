import axios from "axios";
import { UserBookings } from "@/types/userBookings";
import { BookingPaymentDetails } from "@/types/bookingPaymentDetails";
import { CreateBookingDto } from "@/types/createBookingDto";
import { TenantBookings } from "@/types/tenantBookings";
import { UnreviewedBookingDto } from "@/types/unreviewedBookingDto";

const hostnameApi = process.env.NEXT_PUBLIC_HOSTNAME_API;
const prefixApi = process.env.NEXT_PUBLIC_PREFIX_API;

export const createBooking = async (
  bookingData: CreateBookingDto
): Promise<number> => {
  try {
    const response = await axios.post<{ data: { bookingId: number } }>(
      `${hostnameApi}/${prefixApi}/bookings/create`,
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
      `${hostnameApi}/${prefixApi}/bookings/check-existing-pending-booking`,
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
      `${hostnameApi}/${prefixApi}/bookings/user/${userId}`
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
      `${hostnameApi}/${prefixApi}/bookings/${bookingId}/payment-details`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching booking payment details:", error);
    throw error;
  }
};

export const cancelBookingByTenant = async (
  bookingId: number
): Promise<void> => {
  try {
    const response = await axios.patch(
      `${hostnameApi}/${prefixApi}/bookings/${bookingId}/cancel/tenant`
    );
    return response.data;
  } catch (error) {
    console.error("Error cancelling the booking:", error);
    throw error;
  }
};

export const cancelBookingByUser = async (bookingId: number): Promise<void> => {
  try {
    const response = await axios.patch(
      `${hostnameApi}/${prefixApi}/bookings/${bookingId}/cancel/user`
    );
    return response.data;
  } catch (error) {
    console.error("Error cancelling the booking:", error);
    throw error;
  }
};

export const getTenantBookings = async (
  tenantId: number
): Promise<TenantBookings[]> => {
  try {
    const response = await axios.get<{ data: TenantBookings[] }>(
      `${hostnameApi}/${prefixApi}/bookings/tenant/${tenantId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tenant bookings:", error);
    throw error;
  }
};

export const confirmBooking = async (bookingId: number): Promise<void> => {
  try {
    const response = await axios.patch(
      `${hostnameApi}/${prefixApi}/bookings/${bookingId}/confirm`
    );
    return response.data;
  } catch (error) {
    console.error("Error confirming the booking:", error);
    throw error;
  }
};

export const getUnreviewedBookings = async (
  userId: number
): Promise<UnreviewedBookingDto[]> => {
  try {
    const response = await axios.get<{ data: UnreviewedBookingDto[] }>(
      `${hostnameApi}/${prefixApi}/bookings/user/${userId}/unreviewed`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching unreviewed bookings:", error);
    throw error;
  }
};
