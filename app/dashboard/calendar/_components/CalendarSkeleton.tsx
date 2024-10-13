import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const CalendarSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[200px] bg-gray-400" />
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex space-x-2">
            {[...Array(7)].map((_, j) => (
              <Skeleton key={j} className="h-24 w-full bg-gray-400" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSkeleton;