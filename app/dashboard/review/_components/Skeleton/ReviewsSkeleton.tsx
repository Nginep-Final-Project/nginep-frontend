import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ReviewsSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white shadow-md rounded-lg p-6">
        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
        <Skeleton className="h-4 w-1/2 mb-4 bg-gray-200" />
        <Skeleton className="h-20 w-full mb-4 bg-gray-200" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((j) => (
            <Skeleton key={j} className="h-4 w-full bg-gray-200" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default ReviewsSkeleton;
