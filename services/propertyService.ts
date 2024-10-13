import axios from "axios";
import { Property } from "@/types/property";

const hostnameApi = process.env.NEXT_PUBLIC_HOSTNAME_API;
const prefixApi = process.env.NEXT_PUBLIC_PREFIX_API;

export const getUserProperties = async (): Promise<Property[]> => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('sid='))?.split('=')[1];
    const response = await axios.get<{ data: Property[] }>(
      `${hostnameApi}/${prefixApi}/property/tenant`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user properties:", error);
    throw error;
  }
};
