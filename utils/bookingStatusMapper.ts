export const mapBookingStatus = (status: string): string => {
  switch (status) {
    case "PENDING_PAYMENT":
      return "Awaiting Payment";
    case "AWAITING_CONFIRMATION":
      return "Awaiting Confirmation";
    case "CONFIRMED":
      return "Confirmed";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
};
