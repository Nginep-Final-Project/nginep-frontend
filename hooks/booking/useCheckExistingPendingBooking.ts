import { checkExistingPendingBooking } from "@/services/bookingService";
import { useQuery } from "@tanstack/react-query";

const MINUTE = 1000 * 60;

export const useCheckExistingPendingBooking = (
  userId: number,
  roomId: number
) => {
  return useQuery({
    queryKey: ["existingBooking", userId, roomId],
    queryFn: () => checkExistingPendingBooking(userId, roomId),
    enabled: !!userId && !!roomId,
    staleTime: 15 * MINUTE,
    gcTime: 30 * MINUTE,
  });
};
