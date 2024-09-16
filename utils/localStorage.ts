export const clearBookingData = (roomId: string) => {
  const keys = [
    `guestCount_${roomId}`,
    `checkIn_${roomId}`,
    `checkOut_${roomId}`,
    `messageToHost_${roomId}`,
    `paymentMethod_${roomId}`,
    `specificPaymentMethod_${roomId}`,
  ];

  keys.forEach((key) => localStorage.removeItem(key));
};
