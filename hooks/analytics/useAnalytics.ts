import { useQuery } from "@tanstack/react-query";
import {
  getEarningsByProperty,
  getEarningsByTransaction,
  getOverviewReport,
  getPropertyAvailability,
} from "@/services/analyticsService";
import { EarningsByTransactionDto, OverviewReportDto } from "@/types/analytics";

export const useOverviewReport = () => {
  return useQuery<OverviewReportDto, Error>({
    queryKey: ["overviewReport"],
    queryFn: () => getOverviewReport(),
  });
};

export const useEarningsByTransaction = (
  interval: string,
  startDate: Date,
  endDate: Date
) => {
  return useQuery<EarningsByTransactionDto, Error>({
    queryKey: ["earningsByTransaction", interval, startDate, endDate],
    queryFn: () => getEarningsByTransaction(interval, startDate, endDate),
  });
};

export const useEarningsByProperty = () => {
  return useQuery({
    queryKey: ["earningsByProperty"],
    queryFn: () => getEarningsByProperty(),
  });
};

export const usePropertyAvailability = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["propertyAvailability", startDate, endDate],
    queryFn: () => getPropertyAvailability(startDate, endDate),
  });
};
