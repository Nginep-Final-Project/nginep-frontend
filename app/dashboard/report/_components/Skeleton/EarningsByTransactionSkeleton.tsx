import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const EarningsByTransactionSkeleton: React.FC = () => {
  return (
    <div className="py-4 mt-10">
      <Skeleton className="h-8 w-64 mb-4 bg-gray-200" />
      <div className="bg-[#FFF2EC] p-4 md:pt-4 md:pb-8 md:px-10 rounded-xl border shadow-md">
        <div className="flex flex-col xl:flex-row justify-between gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-2">
            <Skeleton className="h-10 w-32 bg-gray-200" />
            <Skeleton className="h-10 w-32 bg-gray-200" />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Skeleton className="h-10 w-32 bg-gray-200" />
            <Skeleton className="h-10 w-32 bg-gray-200" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-8">
          <Skeleton className="h-6 w-48 mb-4 bg-gray-200" />
          <Skeleton className="h-[400px] w-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default EarningsByTransactionSkeleton;