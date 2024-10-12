import React from "react";
import { usePropertyReviews } from "@/hooks/review/useReviews";
import ReviewCard from "./ReviewCard";

interface PropertyReviewsProps {
  propertyId: number;
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ propertyId }) => {
  const { data: reviews, isLoading, error } = usePropertyReviews(propertyId);

  if (isLoading) return <div>Loading reviews...</div>;
  if (error) return <div>Error loading reviews</div>;
  if (!reviews || reviews.length === 0)
    return <div className="mt-8">No reviews yet</div>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} showReplyForm={true} />
      ))}
    </div>
  );
};

export default PropertyReviews;
