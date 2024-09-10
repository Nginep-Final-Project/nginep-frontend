import axios from "axios";
import { UserBookings } from "@/types/userBookings";

export const getUserBookings = async (
  userId: number
): Promise<UserBookings[]> => {
  try {
    const response = await axios.get<{ data: UserBookings[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/user/${userId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};