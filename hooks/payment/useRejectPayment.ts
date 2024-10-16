import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { rejectManualPayment } from "@/services/paymentService";
import { AxiosError } from "axios";
import { response } from "@/types/response";

export const useRejectPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectManualPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenantBookings"] });
      toast({
        title: "Payment Rejected",
        description:
          "The payment has been rejected.",
      });
    },
    onError: (error: AxiosError) => {
      const getErrorMessage = (error: unknown): string | null => {
        if (error instanceof AxiosError && error.response) {
          const apiError = error.response.data as response;
          return apiError.data || apiError.message;
        }
        return "An error occurred while rejecting the manual payment";
      };

      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error),
      });
    },
  });
};
