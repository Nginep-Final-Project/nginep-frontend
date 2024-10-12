import { useQuery } from "@tanstack/react-query";
import { getUserProperties } from "@/services/propertyService";

export const useUserProperties = () => {
  return useQuery({
    queryKey: ["userProperties"],
    queryFn: () => getUserProperties(),
  });
};