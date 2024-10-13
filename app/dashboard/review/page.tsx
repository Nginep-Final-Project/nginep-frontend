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
import { Skeleton } from "@/components/ui/skeleton";
import ReviewsSkeleton from "./_components/Skeleton/ReviewsSkeleton";

const Review: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null
  );

  const { data: properties, isLoading, error } = useUserProperties();

  const noPropertiesFound = !properties || properties.length === 0;

  if (error) return <div>Error loading properties</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Manage Property Reviews
      </h1>
      <div className="mb-10">
        {isLoading ? (
          <Skeleton className="w-[220px] sm:w-[400px] h-10 bg-gray-200" />
        ) : (
          <Select
            onValueChange={(value) => setSelectedPropertyId(Number(value))}
          >
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
        )}
      </div>
      {selectedPropertyId ? (
        <PropertyReviews propertyId={selectedPropertyId} />
      ) : noPropertiesFound ? (
        <div
          className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50"
          role="alert"
        >
          <div>
            <div className="font-medium mb-2">No properties found!</div>
            <div className="text-justify">
              You currently have no registered properties. Please add a property
              to view its reviews.
            </div>
          </div>
        </div>
      ) : (
        <ReviewsSkeleton />
      )}
    </div>
  );
};

export default Review;
