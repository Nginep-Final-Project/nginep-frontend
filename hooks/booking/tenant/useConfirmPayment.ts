import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmPayment } from "@/services/bookingService";
import { toast } from "@/components/ui/use-toast";

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenantBookings"] });
      toast({
        title: "Payment Confirmed",
        description:
          "The payment has been verified and the booking is confirmed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to confirm the payment. Please try again.",
        variant: "destructive",
      });
    },
  });
};
