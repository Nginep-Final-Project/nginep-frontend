import { useQuery } from "@tanstack/react-query";
import {
  getEarningsByProperty,
  getEarningsByTransaction,
  getOverviewReport,
} from "@/services/analyticsService";
import { EarningsByTransactionDto, OverviewReportDto } from "@/types/analytics";

export const useOverviewReport = (tenantId: number) => {
  return useQuery<OverviewReportDto, Error>({
    queryKey: ["overviewReport", tenantId],
    queryFn: () => getOverviewReport(tenantId),
  });
};

export const useEarningsByTransaction = (
  tenantId: number,
  interval: string,
  startDate: Date,
  endDate: Date
) => {
  return useQuery<EarningsByTransactionDto, Error>({
    queryKey: ["earningsByTransaction", tenantId, interval, startDate, endDate],
    queryFn: () =>
      getEarningsByTransaction(tenantId, interval, startDate, endDate),
  });
};

export const useEarningsByProperty = (tenantId: number) => {
  return useQuery({
    queryKey: ["earningsByProperty", tenantId],
    queryFn: () => getEarningsByProperty(tenantId),
  });
};
