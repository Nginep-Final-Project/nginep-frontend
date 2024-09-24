export interface CreateBookingDto {
  roomId: number;
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  numGuests: number;
  paymentMethod: string;
  userMessage?: string;
}
