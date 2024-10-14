import { PaymentStatus, PaymentType } from "./payment";

export interface CreateBookingDto {
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
    numGuests: number;
    paymentMethod: string;
    userMessage?: string;
    bank?: string;
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

    checkInDate: string;
    checkOutDate: string;
    numGuests: number;
    basePrice: number;
  
    bankName?: string;
    bankAccountNumber?: string;
    bankHolderName?: string;
    specificPaymentType?: string;
    vaNumber?: string;
    billKey?: string;
    billerCode?: string;
    qrisUrl?: string;
  }
  
  export interface BookingData {
    guestCount: number;
    checkIn: string;
    checkOut: string;
    message: string;
    paymentMethod: string;
    specificPaymentMethod?: string;
  }

  export interface UnreviewedBookingDto {
    id: number;
    propertyName: string;
    roomName: string;
    checkInDate: string;
    checkOutDate: string;
    propertyCoverImage: string;
  }

  export enum BookingStatus {
    PENDING_PAYMENT = "PENDING_PAYMENT",
    AWAITING_CONFIRMATION = "AWAITING_CONFIRMATION",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
  }
  
  export interface UserBookings {
    bookingId: number;
    roomId: number;
    propertyId: number;
    checkInDate: string;
    checkOutDate: string;
    numGuests: number;
    status: BookingStatus;
    hostName: string;
    roomName: string;
    propertyName: string;
    propertyAddress: string;
    propertyCity: string;
    propertyProvince: string;
    propertyCoverImage: string;
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