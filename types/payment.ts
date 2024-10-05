export interface UploadProofOfPaymentDto {
  proofOfPayment: File;
  paymentId: number;
}

export enum PaymentStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  AWAITING_CONFIRMATION = "AWAITING_CONFIRMATION",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
}

export enum PaymentType {
  MANUAL_PAYMENT = "MANUAL_PAYMENT",
  AUTOMATIC_PAYMENT = "AUTOMATIC_PAYMENT",
}
