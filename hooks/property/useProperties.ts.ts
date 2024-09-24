import { useQuery } from "@tanstack/react-query";
import { getUserProperties } from "@/services/propertyService";

export const useUserProperties = (tenantId: number) => {
  return useQuery({
    queryKey: ["userProperties", tenantId],
    queryFn: () => getUserProperties(tenantId),
  });
};