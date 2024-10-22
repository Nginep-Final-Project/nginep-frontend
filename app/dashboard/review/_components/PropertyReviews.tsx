import React from "react";
import { usePropertyReviews } from "@/hooks/review/useReviews";
import ReviewCard from "./ReviewCard";
import ReviewsSkeleton from "./Skeleton/ReviewsSkeleton";

interface PropertyReviewsProps {
  propertyId: number;
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ propertyId }) => {
  const { data: reviews, isLoading, error } = usePropertyReviews(propertyId);

  if (isLoading) return <ReviewsSkeleton />;
  if (error) return <div>Error loading reviews</div>;
  if (!reviews || reviews.length === 0)
    return (
      <div
        className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50"
        role="alert"
      >
        <div>
          <div className="font-medium mb-2">No guest feedback received yet</div>
        </div>
      </div>
    );

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} showReplyForm={true} />
      ))}
    </div>
  );
};

export default PropertyReviews;
