import { useQuery } from "@tanstack/react-query";
import { getTenantBookings } from "@/services/bookingService";

export const useTenantBookings = (tenantId: number) => {
  return useQuery({
    queryKey: ["tenantBookings", tenantId],
    queryFn: () => getTenantBookings(tenantId),
  });
};
