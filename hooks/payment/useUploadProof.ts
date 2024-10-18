import { useMutation } from "@tanstack/react-query";
import { uploadProofOfManualPayment } from "@/services/paymentService";

export const useUploadProof = () => {
  return useMutation({
    mutationFn: uploadProofOfManualPayment,
  });
};
