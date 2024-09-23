import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { uploadProofOfManualPayment } from "@/services/paymentService";

export const useUploadProof = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProofOfManualPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenantBookings"] });
      toast({
        title: "Proof of Payment",
        description: "The proof of payment has been successfully uploaded.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload the proof of payment. Please try again.",
        variant: "destructive",
      });
    },
  });
};
