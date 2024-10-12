import { useQuery } from "@tanstack/react-query";
import { getTenantBookings } from "@/services/bookingService";

export const useTenantBookings = () => {
  return useQuery({
    queryKey: ["tenantBookings"],
    queryFn: () => getTenantBookings(),
  });
};
