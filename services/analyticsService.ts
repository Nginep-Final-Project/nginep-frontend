import {
  EarningsByPropertyDto,
  EarningsByTransactionDto,
  OverviewReportDto,
  PropertyAvailabilityDto,
} from "@/types/analytics";
import axios from "axios";
import { format } from "date-fns";

const hostnameApi = process.env.NEXT_PUBLIC_HOSTNAME_API;
const prefixApi = process.env.NEXT_PUBLIC_PREFIX_API;

export const getOverviewReport = async (): Promise<OverviewReportDto> => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('sid='))?.split('=')[1];
    const response = await axios.get<{ data: OverviewReportDto }>(
      `${hostnameApi}/${prefixApi}/analytics/overview`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching overview report:", error);
    throw error;
  }
};

export const getEarningsByTransaction = async (
  interval: string,
  startDate: Date,
  endDate: Date
): Promise<EarningsByTransactionDto> => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('sid='))?.split('=')[1];
    const response = await axios.get(
      `${hostnameApi}/${prefixApi}/analytics/earnings/transaction`,
      {
        params: {
          interval,
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
        },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching earnings data by transaction:", error);
    throw error;
  }
};

export const getEarningsByProperty = async (): Promise<
  EarningsByPropertyDto[]
> => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('sid='))?.split('=')[1];
    const response = await axios.get<{ data: EarningsByPropertyDto[] }>(
      `${hostnameApi}/${prefixApi}/analytics/earnings/property`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching earnings by property:", error);
    throw error;
  }
};

export const getPropertyAvailability = async (
  startDate: string,
  endDate: string
) => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('sid='))?.split('=')[1];
    const response = await axios.get<{ data: PropertyAvailabilityDto[] }>(
      `${hostnameApi}/${prefixApi}/analytics/property-availability`,
      {
        params: { startDate, endDate },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching property availability:", error);
    throw error;
  }
};
