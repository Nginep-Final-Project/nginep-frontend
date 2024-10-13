"use client";

import React, { useState, useEffect } from "react";
import Calendar from "./_components/Calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, addMonths } from "date-fns";
import { usePropertyAvailability } from "@/hooks/analytics/useAnalytics";
import { useUserProperties } from "@/hooks/property/useProperties.ts";
import CalendarSkeleton from "./_components/CalendarSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

const CalendarPage: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null
  );
  const startDate = format(new Date(), "yyyy-MM-dd");
  const endDate = format(addMonths(new Date(), 1), "yyyy-MM-dd");

  const { data: properties, isLoading: isLoadingProperties } =
    useUserProperties();
  const { data: availability, isLoading: isLoadingAvailability } =
    usePropertyAvailability(startDate, endDate);

  useEffect(() => {
    if (properties && properties.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(properties[0].id);
    }
  }, [properties, selectedPropertyId]);

  const selectedProperty = availability?.find(
    (prop) => prop.propertyId === selectedPropertyId
  );

  const noPropertiesFound = !properties || properties.length === 0;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Property Availability Calendar
        </h1>
        <div className="mb-6">
          {isLoadingProperties ? (
            <Skeleton className="h-10 w-[200px] bg-gray-200" />
          ) : noPropertiesFound ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50"
              role="alert"
            >
              <div>
                <div className="font-medium mb-2">No properties found!</div>
                <div className="text-justify">
                  You currently have no registered properties. Please add a
                  property to view its availability calendar.
                </div>
              </div>
            </div>
          ) : (
            <Select
              value={selectedPropertyId?.toString()}
              onValueChange={(value) => setSelectedPropertyId(Number(value))}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a property" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {properties?.map((property) => (
                  <SelectItem
                    key={property.id}
                    value={property.id.toString()}
                    className="hover:bg-[#FCE7F3]"
                  >
                    {property.propertyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {isLoadingProperties || isLoadingAvailability ? (
          <CalendarSkeleton />
        ) : (
          selectedProperty && (
            <>
              <Calendar propertyAvailability={selectedProperty} />
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-start gap-4">
                  <div className="bg-[#46FF64] rounded-full p-3"></div>
                  <div>Today&apos;s date</div>
                </div>
                <div className="flex items-center justify-start gap-4">
                  <div className="bg-[#FF385C] rounded-full p-3"></div>
                  <div>Unavailable</div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default CalendarPage;
