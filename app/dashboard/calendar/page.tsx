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
import { useSession } from "next-auth/react";

const CalendarPage: React.FC = () => {
  const { data: session } = useSession();
  const tenantIdString = session?.user?.id;
  const tenantId = tenantIdString ? parseInt(tenantIdString, 10) : undefined;

  if (tenantId === undefined || isNaN(tenantId)) {
    return <div>Please log in to observe your property availability</div>;
  }

  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null
  );
  const startDate = format(new Date(), "yyyy-MM-dd");
  const endDate = format(addMonths(new Date(), 1), "yyyy-MM-dd");

  const { data: properties, isLoading: isLoadingProperties } =
    useUserProperties(tenantId);
  const { data: availability, isLoading: isLoadingAvailability } =
    usePropertyAvailability(tenantId, startDate, endDate);

  useEffect(() => {
    if (properties && properties.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(properties[0].id);
    }
  }, [properties, selectedPropertyId]);

  if (isLoadingProperties || isLoadingAvailability) {
    return <div>Loading...</div>;
  }

  const selectedProperty = availability?.find(
    (prop) => prop.propertyId === selectedPropertyId
  );

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Property Availability Calendar
        </h1>
        <div className="mb-6">
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
        </div>
        {selectedProperty && (
          <Calendar propertyAvailability={selectedProperty} />
        )}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center justify-start gap-4">
            <div className="bg-[#46FF64] rounded-full p-3"></div>
            <div>Today's date</div>
          </div>
          <div className="flex items-center justify-start gap-4">
            <div className="bg-[#FF385C] rounded-full p-3"></div>
            <div>Unavailable</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
