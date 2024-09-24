import axios from "axios";
import { PropertyResponseDto } from "@/types/property";

export const getUserProperties = async (tenantId: number): Promise<PropertyResponseDto[]> => {
  try {
    const response = await axios.get<{ data: PropertyResponseDto[] }>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/property/tenant/${tenantId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user properties:", error);
    throw error;
  }
};