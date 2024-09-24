"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertyReviews from "./_components/PropertyReviews";
import { useUserProperties } from "@/hooks/property/useProperties.ts";

const Review: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null
  );
  const tenantId = 16;
  const { data: properties, isLoading, error } = useUserProperties(tenantId);

  if (isLoading) return <div>Loading properties...</div>;
  if (error) return <div>Error loading properties</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage Property Reviews</h1>
      <div className="mb-10">
        <Select onValueChange={(value) => setSelectedPropertyId(Number(value))}>
          <SelectTrigger className="w-[220px] sm:w-[400px]">
            <SelectValue placeholder="Select a property" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {properties?.map((property) => (
              <SelectItem key={property.id} value={property.id.toString()}>
                {property.propertyName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedPropertyId && (
        <PropertyReviews propertyId={selectedPropertyId} />
      )}
    </div>
  );
};

export default Review;
