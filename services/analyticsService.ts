import {
  EarningsByPropertyDto,
  EarningsByTransactionDto,
  OverviewReportDto,
} from "@/types/analytics";
import axios from "axios";
import { format } from "date-fns";

const hostnameApi = process.env.NEXT_PUBLIC_HOSTNAME_API;
const prefixApi = process.env.NEXT_PUBLIC_PREFIX_API;

export const getOverviewReport = async (
  tenantId: number
): Promise<OverviewReportDto> => {
  try {
    const response = await axios.get<{ data: OverviewReportDto }>(
      `${hostnameApi}/${prefixApi}/analytics/overview/${tenantId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching overview report:", error);
    throw error;
  }
};

export const getEarningsByTransaction = async (
  tenantId: number,
  interval: string,
  startDate: Date,
  endDate: Date
): Promise<EarningsByTransactionDto> => {
  try {
    const response = await axios.get(
      `${hostnameApi}/${prefixApi}/analytics/earnings/transaction/${tenantId}`,
      {
        params: {
          interval,
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching earnings data by transaction:", error);
    throw error;
  }
};

export const getEarningsByProperty = async (
  tenantId: number
): Promise<EarningsByPropertyDto[]> => {
  try {
    const response = await axios.get<{ data: EarningsByPropertyDto[] }>(
      `${hostnameApi}/${prefixApi}/analytics/earnings/property/${tenantId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching earnings by property:", error);
    throw error;
  }
};
