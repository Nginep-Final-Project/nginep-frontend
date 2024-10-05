import { checkExistingPendingBooking } from "@/services/bookingService";
import { useQuery } from "@tanstack/react-query";

const MINUTE = 1000 * 60;

export const useCheckExistingPendingBooking = (roomId: number) => {
  return useQuery({
    queryKey: ["existingBooking", roomId],
    queryFn: () => checkExistingPendingBooking(roomId),
    staleTime: 15 * MINUTE,
    gcTime: 30 * MINUTE,
  });
};
