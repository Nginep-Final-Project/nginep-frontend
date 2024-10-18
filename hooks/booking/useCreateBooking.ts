import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/services/bookingService";
import { CreateBookingDto } from "@/types/booking";
import { toast } from "@/components/ui/use-toast";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (bookingData: CreateBookingDto) => createBooking(bookingData),
  });
};
