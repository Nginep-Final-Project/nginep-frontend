import axios from "axios";
import { Property } from "@/types/property";

export const getUserProperties = async (
  tenantId: number
): Promise<Property[]> => {
  try {
    const response = await axios.get<{ data: Property[] }>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/property/tenant/${tenantId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user properties:", error);
    throw error;
  }
};
