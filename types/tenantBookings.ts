export enum BookingStatus {
    PENDING_PAYMENT = "PENDING_PAYMENT",
    AWAITING_CONFIRMATION = "AWAITING_CONFIRMATION",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
  }
  
  export interface TenantBooking {
    bookingId: number;
    roomId: number;
    propertyName: string;
    checkInDate: string;
    checkOutDate: string;
    guestName: string;
    numGuests: number;
    roomName: string;
    finalPrice: number;
    status: BookingStatus;
    paymentType: string;
    paymentStatus: string;
    proofOfPayment?: string;
  }