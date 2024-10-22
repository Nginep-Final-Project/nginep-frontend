import React from "react";
import { ReviewDto } from "@/types/review";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
  reviews: ReviewDto[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="mt-10">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Your Past Reviews</h2>

        {reviews.length < 1 && <p>You haven&apos;t written any reviews yet.</p>}

        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
