import { useQuery } from "@tanstack/react-query";
import { UserBookings, BookingStatus } from "@/types/userBookings";
import { getUserBookings } from "@/services/bookingService";

const isSameDay = (date1: Date, date2: Date) =>
  date1.toDateString() === date2.toDateString();

const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

export const useUserBookings = (userId: number) => {
  const query = useQuery({
    queryKey: ["userBookings", userId],
    queryFn: () => getUserBookings(userId),
  });

  const filterBookings = (
    predicate: (booking: UserBookings) => boolean
  ): UserBookings[] => {
    return query.data ? query.data.filter(predicate) : [];
  };

  return {
    ...query,
    getTomorrowBookings: () =>
      filterBookings(
        (booking) =>
          isSameDay(new Date(booking.checkInDate), getTomorrowDate()) &&
          booking.status === BookingStatus.CONFIRMED
      ),
    getUpcomingBookings: () =>
      filterBookings(
        (booking) =>
          new Date(booking.checkInDate) > new Date() &&
          booking.status === BookingStatus.CONFIRMED
      ),
    getAwaitingConfirmationBookings: () =>
      filterBookings(
        (booking) => booking.status === BookingStatus.AWAITING_CONFIRMATION
      ),
    getAwaitingPaymentBookings: () =>
      filterBookings(
        (booking) => booking.status === BookingStatus.PENDING_PAYMENT
      ),
    getCancelledBookings: () =>
      filterBookings((booking) => booking.status === BookingStatus.CANCELLED),
  };
};
