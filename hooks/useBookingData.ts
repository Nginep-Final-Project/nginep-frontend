import { useState, useEffect, useCallback } from "react";
import { BookingData } from "@/types/bookingData";
import globalEventEmitter from "../utils/events";

const useBookingData = (roomId?: string) => {
  const [bookingData, setBookingData] = useState<BookingData>(() => ({
    guestCount: Number(localStorage.getItem(`guestCount_${roomId}`)) || 1,
    checkIn: localStorage.getItem(`checkIn_${roomId}`) || "",
    checkOut: localStorage.getItem(`checkOut_${roomId}`) || "",
    message: localStorage.getItem(`messageToHost_${roomId}`) || "",
    paymentMethod: localStorage.getItem(`paymentMethod_${roomId}`) || "",
  }));

  const updateBookingData = useCallback(
    (key: keyof BookingData, value: string | number) => {
      setBookingData((prev) => {
        const newData = { ...prev, [key]: value };
        const storageKey = `${
          key === "message" ? "messageToHost" : key
        }_${roomId}`;
        localStorage.setItem(storageKey, value.toString());
        globalEventEmitter.emit("bookingDataChanged");
        return newData;
      });
    },
    [roomId]
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setBookingData({
        guestCount: Number(localStorage.getItem(`guestCount_${roomId}`)) || 1,
        checkIn: localStorage.getItem(`checkIn_${roomId}`) || "",
        checkOut: localStorage.getItem(`checkOut_${roomId}`) || "",
        message: localStorage.getItem(`messageToHost_${roomId}`) || "",
        paymentMethod: localStorage.getItem(`paymentMethod_${roomId}`) || "",
      });
    };

    globalEventEmitter.on("bookingDataChanged", handleStorageChange);

    return () => {
      globalEventEmitter.off("bookingDataChanged", handleStorageChange);
    };
  }, [roomId]);

  useEffect(() => {
    if (!localStorage.getItem(`guestCount_${roomId}`)) {
      localStorage.setItem(`guestCount_${roomId}`, "1");
      setBookingData((prev) => ({ ...prev, guestCount: 1 }));
    }
  }, [roomId]);

  return { bookingData, updateBookingData };
};

export default useBookingData;
