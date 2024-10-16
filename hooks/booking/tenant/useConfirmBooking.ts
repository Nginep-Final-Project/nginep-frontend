import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmBooking } from "@/services/bookingService";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { response } from "@/types/response";

export const useConfirmBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenantBookings"] });
      toast({
        title: "Booking Confirmed",
        description: "The reservation has been successfully confirmed.",
      });
    },
    onError: (error: AxiosError) => {
      const getErrorMessage = (error: unknown): string | null => {
        if (error instanceof AxiosError && error.response) {
          const apiError = error.response.data as response;
          return apiError.data || apiError.message;
        }
        return "An error occurred while confirming the booking";
      };

      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error),
      });
    },
  });
};
