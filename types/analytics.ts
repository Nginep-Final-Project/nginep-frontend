export interface OverviewReportDto {
  totalEarnings: number;
  totalBookings: number;
  totalProperties: number;
  peakSeasonRevenueDifference: number;
}

 export interface EarningByTransactionDataPoint {
  date: string;
  amount: number;
}

export interface EarningsByTransactionDto {
  totalEarnings: number;
  earningsData: EarningByTransactionDataPoint[];
}

export interface EarningsByPropertyDto {
  propertyName: string;
  earnings: number;
}