import React, { useState } from "react";
import { ReviewDto } from "@/types/review";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import ReviewReplyForm from "./ReviewReplyForm";
import { Button } from "@/components/ui/button";

interface ReviewCardProps {
  review: ReviewDto;
  showReplyForm?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  showReplyForm = false,
}) => {
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">{review.propertyName}</h2>
          <p className="text-gray-600">
            Reviewed{" "}
            {formatDistanceToNow(new Date(review.createdAt), {
              addSuffix: true,
            })}
            , by <span className="font-semibold"> {review.fullName}</span>
          </p>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 mr-1" />
          <span className="font-semibold">
            {review.averageRating.toFixed(1)}
          </span>
        </div>
      </div>
      <p className="text-gray-700 text-justify text-sm sm:text-base mb-4">
        {review.comment}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-xs sm:text-base">
        <RatingItem label="Cleanliness" rating={review.cleanlinessRating} />
        <RatingItem label="Communication" rating={review.communicationRating} />
        <RatingItem label="Check-in" rating={review.checkInRating} />
        <RatingItem label="Accuracy" rating={review.accuracyRating} />
        <RatingItem label="Location" rating={review.locationRating} />
        <RatingItem label="Value" rating={review.valueRating} />
      </div>
      {review.reply ? (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold">
            Response from {review.reply.tenantName}:
          </p>
          <p className="text-gray-700 mt-2">{review.reply.reply}</p>
          <p className="text-gray-500 text-sm mt-2">
            Responded{" "}
            {formatDistanceToNow(new Date(review.reply.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      ) : (
        showReplyForm && (
          <div className="mt-4">
            {isReplyFormVisible ? (
              <ReviewReplyForm
                reviewId={review.id}
                onSuccess={() => setIsReplyFormVisible(false)}
              />
            ) : (
              <Button onClick={() => setIsReplyFormVisible(true)}>
                Reply to Review
              </Button>
            )}
          </div>
        )
      )}
    </div>
  );
};

const RatingItem: React.FC<{ label: string; rating: number }> = ({
  label,
  rating,
}) => (
  <div className="flex items-center">
    <span className="text-gray-600 mr-2">{label}:</span>
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  </div>
);

export default ReviewCard;
