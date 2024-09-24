import axios from "axios";

export const confirmManualPayment = async (paymentId: number): Promise<void> => {
    try {
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/payments/${paymentId}/confirm-manual`
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
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/payments/${paymentId}/reject`
        );
        return response.data;
      } catch (error) {
        console.error("Error rejecting the manual payment:", error);
        throw error;
      }
};

export const uploadProofOfManualPayment = async (paymentId: number): Promise<void> => {
    try {
        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/payments/${paymentId}/upload-proof`
        );
        return response.data;
      } catch (error) {
        console.error("Error uploading the proof of manual payment:", error);
        throw error;
      }
};