export enum BookingStatus {
    PENDING_PAYMENT = "PENDING_PAYMENT",
    AWAITING_CONFIRMATION = "AWAITING_CONFIRMATION",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
  }
  
  export interface TenantBookings {
    bookingId: number;
    roomId: number;
    paymentId: number;
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
    propertyCoverImage: string;
    type: string;
  }