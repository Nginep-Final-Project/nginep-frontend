import { useRouter } from "next/navigation";
import { BookingData } from "@/types/bookingData";
import globalEventEmitter from "@/utils/events";
import useBookingData from "./useBookingData";

const useValidatedNavigation = (roomId?: string) => {
  const router = useRouter();
  const { bookingData } = useBookingData(roomId);

  const navigate = (
    path: string,
    requiredFields: (keyof BookingData)[] = []
  ) => {
    const isValid = requiredFields.every((field) => !!bookingData[field]);

    if (isValid) {
      const fullPath =
        path.startsWith("/") && roomId ? `/${roomId}${path}` : path;
      router.push(fullPath);
    } else {
      globalEventEmitter.emit("showNavigationWarning");
    }
  };

  return { navigate };
};

export default useValidatedNavigation;
