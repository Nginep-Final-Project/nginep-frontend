export interface UserBookingList {
    id: string;
    propertyName: string;
    checkInDate: Date;
    checkOutDate: Date;
    hostName: string;
    location: string;
    country: string;
    imageUrl: string;
    status:
      | "Confirmed"
      | "Awaiting Confirmation"
      | "Awaiting Payment"
      | "Cancelled";
  }