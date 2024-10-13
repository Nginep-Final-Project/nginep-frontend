import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const EarningsByPropertySkeleton: React.FC = () => {
  return (
    <div className="py-4 mt-10">
      <Skeleton className="h-8 w-64 mb-4 bg-gray-200" />
      <div className="bg-[#FFF2EC] p-4 md:pt-4 md:pb-8 md:px-10 rounded-xl border shadow-md">
        <div className="flex justify-between mb-4">
          <Skeleton className="h-10 w-[180px] bg-gray-200" />
        </div>
        <div className="bg-white rounded-xl pr-4 pl-2 py-4 md:py-8 md:pr-8 md:pl-4">
          <Skeleton className="h-[400px] w-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default EarningsByPropertySkeleton;