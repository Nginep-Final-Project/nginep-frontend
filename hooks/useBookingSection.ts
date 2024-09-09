// app/user/bookings/hooks/useBookings.ts
import { useState, useEffect } from "react";
import { isTomorrow, isFuture, isPast } from "date-fns";
import { UserBookingList } from "@/types/userBookingList";

const useBookings = () => {
  const [bookings, setBookings] = useState<UserBookingList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with setTimeout
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // This is where you'd normally fetch the bookings from an API
        const mockBookings: UserBookingList[] = [
          {
            id: "1",
            propertyName: "Room in Kecamatan Depok Ass",
            checkInDate: new Date(2024, 8, 10),
            checkOutDate: new Date(2024, 8, 19),
            hostName: "Kamarka",
            location: "Kecamatan Depok",
            country: "Indonesia",
            imageUrl:
              "https://static.wikia.nocookie.net/great-characters/images/7/70/Finn_and_Jake-0.png/revision/latest?cb=20180905030951",
            status: "Confirmed",
          },
          {
            id: "2",
            propertyName: "Rental unit in DKI Jakarta",
            checkInDate: new Date(2025, 7, 28),
            checkOutDate: new Date(2025, 8, 2),
            hostName: "Nadia",
            location: "Kecamatan Grogol",
            country: "Indonesia",
            imageUrl:
              "https://static.wikia.nocookie.net/adventuretimesuperfans/images/1/17/Ooo.jpg/revision/latest?cb=20120415202605",
            status: "Confirmed",
          },
          {
            id: "3",
            propertyName: "Rental unit in DKI Jakarta",
            checkInDate: new Date(2025, 7, 28),
            checkOutDate: new Date(2025, 8, 2),
            hostName: "Nadia",
            location:
              "Kecamatan Grogol petamburan, Daerah Khusus Ibukota Jakarta",
            country: "Indonesia",
            imageUrl:
              "https://static.wikia.nocookie.net/great-characters/images/7/70/Finn_and_Jake-0.png/revision/latest?cb=20180905030951",
            status: "Awaiting Payment",
          },
          {
            id: "4",
            propertyName: "Rental unit in DKI Jakarta",
            checkInDate: new Date(2025, 7, 28),
            checkOutDate: new Date(2025, 8, 2),
            hostName: "Nadia",
            location:
              "Kecamatan Grogol petamburan, Daerah Khusus Ibukota Jakarta",
            country: "Indonesia",
            imageUrl:
              "https://static.wikia.nocookie.net/adventuretimesuperfans/images/1/17/Ooo.jpg/revision/latest?cb=20120415202605",
            status: "Confirmed",
          },
          {
            id: "4",
            propertyName: "Rental unit in DKI Jakarta",
            checkInDate: new Date(2025, 7, 28),
            checkOutDate: new Date(2025, 8, 2),
            hostName: "Nadia",
            location:
              "Kecamatan Grogol petamburan, Daerah Khusus Ibukota Jakarta",
            country: "Indonesia",
            imageUrl:
              "https://static.wikia.nocookie.net/adventuretimesuperfans/images/1/17/Ooo.jpg/revision/latest?cb=20120415202605",
            status: "Awaiting Confirmation",
          },
          {
            id: "4",
            propertyName: "Rental unit in DKI Jakarta",
            checkInDate: new Date(2025, 7, 28),
            checkOutDate: new Date(2025, 8, 2),
            hostName: "Nadia",
            location:
              "Kecamatan Grogol petamburan, Daerah Khusus Ibukota Jakarta",
            country: "Indonesia",
            imageUrl:
              "https://static.wikia.nocookie.net/adventuretimesuperfans/images/1/17/Ooo.jpg/revision/latest?cb=20120415202605",
            status: "Cancelled",
          },
        ];

        setBookings(mockBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        // Handle error state if needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getTomorrowBookings = (bookings: UserBookingList[]) =>
    bookings.filter((booking) => isTomorrow(booking.checkInDate));

  const getUpcomingBookings = (bookings: UserBookingList[]) =>
    bookings.filter(
      (booking) =>
        booking.status === "Confirmed" &&
        isFuture(booking.checkInDate) &&
        !isTomorrow(booking.checkInDate)
    );

  const getAwaitingConfirmationBookings = (bookings: UserBookingList[]) =>
    bookings.filter(
      (booking) =>
        booking.status === "Awaiting Confirmation" &&
        isFuture(booking.checkInDate)
    );

  const getAwaitingPaymentBookings = (bookings: UserBookingList[]) =>
    bookings.filter(
      (booking) =>
        booking.status === "Awaiting Payment" && isFuture(booking.checkInDate)
    );

  const getCancelledBookings = (bookings: UserBookingList[]) =>
    bookings.filter(
      (booking) =>
        booking.status === "Cancelled" && isFuture(booking.checkInDate)
    );

  return {
    bookings,
    isLoading,
    getTomorrowBookings,
    getUpcomingBookings,
    getAwaitingConfirmationBookings,
    getAwaitingPaymentBookings,
    getCancelledBookings,
  };
};

export default useBookings;
