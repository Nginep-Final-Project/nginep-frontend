import { useQuery } from "@tanstack/react-query";
import { getUnreviewedBookings } from "@/services/bookingService";

export const useUnreviewedBookings = (userId: number) => {
  return useQuery({
    queryKey: ["unreviewedBookings", userId],
    queryFn: () => getUnreviewedBookings(userId),
  });
};