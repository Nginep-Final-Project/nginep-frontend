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

export interface BookingPaymentDetails {
  bookingId: number;
  roomId: number;
  paymentId: number;
  finalPrice: number;
  paymentStatus: PaymentStatus;
  expiryTime: string;
  propertyName: string;
  roomName: string;
  propertyAddress: string;
  propertyCity: string;
  propertyProvince: string;
  coverImage: string;
  paymentType: PaymentType;

  bankName?: string;
  bankAccountNumber?: string;
  bankHolderName?: string;
  specificPaymentType?: string;
  vaNumber?: string;
  billKey?: string;
  billerCode?: string;
  qrisUrl?: string;
}
