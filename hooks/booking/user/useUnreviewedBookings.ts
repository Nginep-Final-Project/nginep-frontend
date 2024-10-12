import { useQuery } from "@tanstack/react-query";
import { getUnreviewedBookings } from "@/services/bookingService";

export const useUnreviewedBookings = () => {
  return useQuery({
    queryKey: ["unreviewedBookings"],
    queryFn: () => getUnreviewedBookings(),
  });
};
