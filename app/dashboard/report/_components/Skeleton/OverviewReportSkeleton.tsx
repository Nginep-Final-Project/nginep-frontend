import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const OverviewReportSkeleton: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="relative flex flex-col justify-center items-center mt-32">
          <Skeleton className="absolute bottom-[70%] h-[200px] w-[150px] bg-gray-200" />
          <CardHeader className="flex items-center justify-between">
            <Skeleton className="h-8 w-32 mt-20 bg-gray-200" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-12 w-32 bg-gray-200" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewReportSkeleton;