import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { confirmManualPayment } from "@/services/paymentService";
import { AxiosError } from "axios";
import { response } from "@/types/response";

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmManualPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenantBookings"] });
      toast({
        title: "Payment Confirmed",
        description:
          "The payment has been verified",
      });
    },
    onError: (error: AxiosError) => {
      const getErrorMessage = (error: unknown): string | null => {
        if (error instanceof AxiosError && error.response) {
          const apiError = error.response.data as response;
          return apiError.data || apiError.message;
        }
        return "An error occurred while confirming the manual payment";
      };

      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error),
      });
    },
  });
};
