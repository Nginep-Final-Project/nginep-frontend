import { UploadProofOfPaymentDto } from "@/types/payment";
import axios from "axios";

const hostnameApi = process.env.NEXT_PUBLIC_HOSTNAME_API;
const prefixApi = process.env.NEXT_PUBLIC_PREFIX_API;

export const confirmManualPayment = async (
  paymentId: number
): Promise<void> => {
  try {
    const response = await axios.patch(
      `${hostnameApi}/${prefixApi}/payments/${paymentId}/confirm-manual`
    );
    return response.data;
  } catch (error) {
    console.error("Error confirming the manual payment:", error);
    throw error;
  }
};

export const rejectManualPayment = async (paymentId: number): Promise<void> => {
  try {
    const response = await axios.patch(
      `${hostnameApi}/${prefixApi}/payments/${paymentId}/reject`
    );
    return response.data;
  } catch (error) {
    console.error("Error rejecting the manual payment:", error);
    throw error;
  }
};

export const uploadProofOfManualPayment = async (
  data: UploadProofOfPaymentDto
): Promise<void> => {
  const formData = new FormData();
  formData.append("proofOfPayment", data.proofOfPayment);
  formData.append("paymentId", data.paymentId.toString());

  try {
    const response = await axios.patch(
      `${hostnameApi}/${prefixApi}/payments/upload-proof`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error uploading the proof of manual payment:", error);
    throw error;
  }
};
