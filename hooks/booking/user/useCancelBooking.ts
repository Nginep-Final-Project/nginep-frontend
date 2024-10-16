import { toast } from "@/components/ui/use-toast";
import { cancelBookingByUser } from "@/services/bookingService";
import { response } from "@/types/response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBookingByUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBookings"] });
      queryClient.invalidateQueries({ queryKey: ["existingBooking"] });
      queryClient.invalidateQueries({ queryKey: ["bookingPaymentDetails"] });
      toast({
        title: "Success",
        description: "Success on booking cancellation",
      });
    },
    onError: (error: AxiosError) => {
      const getErrorMessage = (error: unknown): string | null => {
        if (error instanceof AxiosError && error.response) {
          const apiError = error.response.data as response;
          return apiError.data || apiError.message;
        }
        return "An error occurred while cancelling the booking";
      };

      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error),
      });
    },
  });
};
