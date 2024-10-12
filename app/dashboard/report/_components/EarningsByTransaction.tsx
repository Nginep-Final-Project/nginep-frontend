import React, { useState } from "react";
import {
  format,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./DatePicker";
import { useEarningsByTransaction } from "@/hooks/analytics/useAnalytics";

const EarningsByTransaction: React.FC = () => {
  const [interval, setInterval] = useState<"daily" | "monthly">("monthly");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [startDate, setStartDate] = useState(startOfYear(new Date(year, 0)));
  const [endDate, setEndDate] = useState(endOfYear(new Date(year, 0)));
  const { data, isLoading, error } = useEarningsByTransaction(
    interval,
    startDate,
    endDate
  );

  const handleIntervalChange = (value: string) => {
    setInterval(value as "daily" | "monthly");
    if (value === "monthly") {
      setStartDate(startOfYear(new Date(year, 0)));
      setEndDate(endOfYear(new Date(year, 0)));
    } else {
      setStartDate(startOfMonth(new Date(year, month)));
      setEndDate(endOfMonth(new Date(year, month)));
    }
  };

  const handleYearChange = (value: string) => {
    const newYear = parseInt(value, 10);
    setYear(newYear);
    setStartDate(startOfYear(new Date(newYear, 0)));
    setEndDate(endOfYear(new Date(newYear, 0)));
  };

  const handleMonthChange = (value: string) => {
    const newMonth = parseInt(value, 10);
    setMonth(newMonth);
    setStartDate(startOfMonth(new Date(year, newMonth)));
    setEndDate(endOfMonth(new Date(year, newMonth)));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="py-4 mt-10">
      <h2 className="text-2xl font-bold mb-4">Earnings by Transaction</h2>
      <div className="bg-[#FFF2EC] p-4 md:pt-4 md:pb-8 md:px-10 rounded-xl border shadow-md">
        <div className="flex flex-col xl:flex-row justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-2 mb-2 md:mb-0">
            <Select onValueChange={handleIntervalChange} value={interval}>
              <SelectTrigger className="w-full md:w-32 bg-white">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            {interval === "monthly" ? (
              <Select onValueChange={handleYearChange} value={year.toString()}>
                <SelectTrigger className="w-full md:w-32 bg-white">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {[2022, 2023, 2024].map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <>
                <Select
                  onValueChange={handleYearChange}
                  value={year.toString()}
                >
                  <SelectTrigger className="w-full md:w-32 bg-white">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {[2022, 2023, 2024].map((y) => (
                      <SelectItem key={y} value={y.toString()}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={handleMonthChange}
                  value={month.toString()}
                >
                  <SelectTrigger className="w-full md:w-32 bg-white">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {format(new Date(2000, i, 1), "MMMM")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 mb-4">
            <div className="w-full md:w-auto">
              <DatePicker
                date={startDate}
                setDate={(date) => date && setStartDate(date)}
              />
            </div>
            <div className="w-full md:w-auto">
              <DatePicker
                date={endDate}
                setDate={(date) => date && setEndDate(date)}
              />
            </div>
          </div>
        </div>
        {data && (
          <>
            <div className="bg-white rounded-xl p-8">
              <div className="text-xl font-semibold mb-4">
                Total: IDR {data.totalEarnings.toFixed(2)}
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data.earningsData}
                    className="overflow-x-auto"
                  >
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) =>
                        format(
                          new Date(value),
                          interval === "daily" ? "MMM dd" : "MMM"
                        )
                      }
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toFixed(2)}`,
                        "Earnings",
                      ]}
                      labelFormatter={(label) =>
                        format(
                          new Date(label),
                          interval === "daily" ? "MMM dd, yyyy" : "MMMM yyyy"
                        )
                      }
                    />
                    <Line type="monotone" dataKey="amount" stroke="#825BDA" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EarningsByTransaction;
