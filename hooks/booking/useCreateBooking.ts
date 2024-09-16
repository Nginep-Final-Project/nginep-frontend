import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/services/bookingService";
import { CreateBookingDto } from "@/types/createBookingDto";
import { toast } from "@/components/ui/use-toast";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (bookingData: CreateBookingDto) => createBooking(bookingData),
    onSuccess: () => {
      toast({
        description: "Booking created successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: "Failed to create booking. Please try again",
      });
      console.error("Error creating booking:", error);
    },
  });
};
