import { useQuery } from "@tanstack/react-query";
import { getBookingPaymentDetails } from "@/services/bookingService";

export const useBookingPaymentDetails = (
  bookingId: number | null | undefined
) => {
  return useQuery({
    queryKey: ["bookingPaymentDetails", bookingId],
    queryFn: () => (bookingId ? getBookingPaymentDetails(bookingId) : null),
    enabled: !!bookingId,
  });
};
