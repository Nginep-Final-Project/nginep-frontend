import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEarningsByProperty } from "@/hooks/analytics/useAnalytics";
import EarningsByPropertySkeleton from "./Skeleton/EarningsByPropertySkeleton";

const EarningsByProperty: React.FC = () => {
  const { data, isLoading, error } = useEarningsByProperty();
  const [sortOrder, setSortOrder] = useState<"highest" | "lowest">("highest");
  const [yAxisWidth, setYAxisWidth] = useState(150);
  const [charLimit, setCharLimit] = useState(20);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setYAxisWidth(50);
        setCharLimit(8);
      } else if (window.innerWidth < 1280) {
        setYAxisWidth(100);
        setCharLimit(15);
      } else {
        setYAxisWidth(150);
        setCharLimit(20);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <EarningsByPropertySkeleton />;
  if (error) return <div>Error fetching data</div>;
  if (!data) return null;

  const sortedData = [...data].sort((a, b) =>
    sortOrder === "highest" ? b.earnings - a.earnings : a.earnings - b.earnings
  );

  const truncatePropertyName = (name: string) => {
    return name.length > charLimit
      ? name.substring(0, charLimit - 3) + "..."
      : name;
  };

  const transformedData = sortedData.map((item) => ({
    ...item,
    truncatedName: truncatePropertyName(item.propertyName),
    formattedEarnings: item.earnings > 0 ? item.earnings.toLocaleString() : "",
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{data.propertyName}</p>
          <p>Earnings: IDR {data.earnings.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const CustomYAxisTick = ({ y, payload }: any) => {
    return (
      <g transform={`translate(0,${y})`}>
        <text
          x={yAxisWidth + 10}
          y={0}
          dy={6}
          textAnchor="end"
          fill="#666"
          style={{
            fontSize: "12px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: yAxisWidth,
          }}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className="py-4 mt-10">
      <h2 className="text-2xl font-bold mb-4">Earnings by Property</h2>
      <div className="bg-[#FFF2EC] p-4 md:pt-4 md:pb-8 md:px-10 rounded-xl border shadow-md">
        <div className="flex justify-between mb-4">
          <Select
            onValueChange={(value) =>
              setSortOrder(value as "highest" | "lowest")
            }
            value={sortOrder}
          >
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="highest">Highest earnings</SelectItem>
              <SelectItem value="lowest">Lowest earnings</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="bg-white rounded-xl pr-4 pl-2 py-4 md:py-8 md:pr-8 md:pl-4">
          <div
            style={{
              height: `${transformedData.length * 40 + 50}px`,
              minHeight: "400px",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transformedData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number">
                  <Label value="Earnings in IDR" position="bottom" offset={0} />
                </XAxis>
                <YAxis
                  dataKey="truncatedName"
                  type="category"
                  width={yAxisWidth}
                  tick={<CustomYAxisTick />}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="earnings" fill="#1AA367" barSize={15}>
                  <LabelList dataKey="formattedEarnings" position="right" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsByProperty;
