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

export interface PropertyAvailabilityDto {
  propertyId: number;
  propertyName: string;
  rooms: RoomAvailabilityDto[];
}

export interface RoomAvailabilityDto {
  roomId: number;
  roomName: string;
  unavailableDates: UnavailableDateRangeDto[];
}

export interface UnavailableDateRangeDto {
  startDate: string;
  endDate: string;
}