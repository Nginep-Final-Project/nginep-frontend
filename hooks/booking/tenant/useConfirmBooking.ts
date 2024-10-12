import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmBooking } from "@/services/bookingService";
import { toast } from "@/components/ui/use-toast";

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
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to confirm the booking. Please try again.",
        variant: "destructive",
      });
    },
  });
};
