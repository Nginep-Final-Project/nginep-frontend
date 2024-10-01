import React from "react";
import { useOverviewReport } from "@/hooks/analytics/useAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EarningsIcon from "@/public/icons/earningsIcon.png";
import BookingsIcon from "@/public/icons/bookingsIcon.png";
import PropertiesIcon from "@/public/icons/propertiesIcon.png";
import PeakSeasonIcon from "@/public/icons/peakSeasonIcon.png"; 
import Image from "next/image";

interface OverviewReportProps {
  tenantId: number;
}

const OverviewReport: React.FC<OverviewReportProps> = ({ tenantId }) => {
  const { data: report, isLoading, error } = useOverviewReport(tenantId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading overview report</div>;
  if (!report) return (
    <>
    <div>You currently have no reports or anything in your account. Let's rent your properties!</div>
    </>
  );

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-32">
        <Card className="relative bg-[#ECF1FF] flex flex-col justify-center items-center">
          <Image
            src={EarningsIcon}
            alt="Total Earnings"
            height={200}
            width={110}
            className="absolute bottom-[70%]"
          />
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold mt-20">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl font-bold bg-white rounded-2xl py-2 px-4 text-center">
              IDR {report.totalEarnings.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#FFF6F2] relative flex flex-col justify-center items-center mt-32 md:mt-0">
          <Image
            src={BookingsIcon}
            alt="Total Bookings"
            height={200}
            width={110}
            className="absolute bottom-[70%]"
          />
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold mt-20">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl font-bold bg-white rounded-2xl py-2 px-4 text-center">
              {report.totalBookings}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#ECF1FF] relative flex flex-col justify-center items-center mt-32 lg:mt-0">
          <Image
            src={PropertiesIcon}
            alt="Total Properties"
            height={200}
            width={110}
            className="absolute bottom-[70%]"
          />
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold mt-20">
              Total Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl font-bold bg-white rounded-2xl py-2 px-4 text-center">
              {report.totalProperties}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#FFF6F2] relative flex flex-col justify-center items-center mt-32 lg:mt-0">
          <Image
            src={PeakSeasonIcon}
            alt="Total Peak Season Revenue Difference"
            height={200}
            width={110}
            className="absolute bottom-[70%]"
          />
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold mt-20 text-center">
              Peak Season Revenue Difference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl font-bold bg-white rounded-2xl py-2 px-4 text-center ">
              IDR {report.peakSeasonRevenueDifference.toFixed(2)}
            </div>
            <br />
            <p className="text-xs text-muted-foreground text-center">
              Additional revenue from peak season pricing
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OverviewReport;
