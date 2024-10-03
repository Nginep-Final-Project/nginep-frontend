import axios from "axios";
import { Property } from "@/types/property";

const hostnameApi = process.env.NEXT_PUBLIC_HOSTNAME_API;
const prefixApi = process.env.NEXT_PUBLIC_PREFIX_API;


export const getUserProperties = async (
  tenantId: number
): Promise<Property[]> => {
  try {
    const response = await axios.get<{ data: Property[] }>(
      `${hostnameApi}/${prefixApi}/property/tenant/${tenantId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user properties:", error);
    throw error;
  }
};
