export enum BookingStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  AWAITING_CONFIRMATION = "AWAITING_CONFIRMATION",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export interface UserBookings {
  bookingId: number;
  roomId: number;
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
