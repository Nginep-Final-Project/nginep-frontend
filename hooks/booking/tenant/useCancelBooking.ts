import { toast } from "@/components/ui/use-toast";
import { cancelBookingByTenant } from "@/services/bookingService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBookingByTenant,
    onMutate: () => {
      toast({
        title: "Cancelling booking",
        description: "Please wait...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenantBookings"] });
      toast({
        title: "Success",
        description: "Success on booking cancellation",
      });
    },
    onError: (error) => {
      console.error("Error cancelling booking:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while cancelling the booking",
      });
    },
  });
};
