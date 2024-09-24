import React, { useState } from "react";
import { CreateReviewDto } from "@/types/review";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReview } from "@/hooks/review/useReviews";
import RatingInput from "./RatingInput";

interface ReviewFormProps {
  bookingId: number;
  onSuccess: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookingId, onSuccess }) => {
  const [review, setReview] = useState<CreateReviewDto>({
    bookingId,
    cleanlinessRating: 0,
    communicationRating: 0,
    checkInRating: 0,
    accuracyRating: 0,
    locationRating: 0,
    valueRating: 0,
    comment: "",
  });

  const createReviewMutation = useCreateReview();

  const handleRatingChange = (
    category: keyof CreateReviewDto,
    value: number
  ) => {
    setReview((prev) => ({ ...prev, [category]: value }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReviewMutation.mutateAsync(review);
      onSuccess();
    } catch (error) {
      console.error("Error submitting the review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <RatingInput
          label="Cleanliness"
          value={review.cleanlinessRating}
          onChange={(value) => handleRatingChange("cleanlinessRating", value)}
        />
        <RatingInput
          label="Communication"
          value={review.communicationRating}
          onChange={(value) => handleRatingChange("communicationRating", value)}
        />
        <RatingInput
          label="Check-in"
          value={review.checkInRating}
          onChange={(value) => handleRatingChange("checkInRating", value)}
        />
        <RatingInput
          label="Accuracy"
          value={review.accuracyRating}
          onChange={(value) => handleRatingChange("accuracyRating", value)}
        />
        <RatingInput
          label="Location"
          value={review.locationRating}
          onChange={(value) => handleRatingChange("locationRating", value)}
        />
        <RatingInput
          label="Value"
          value={review.valueRating}
          onChange={(value) => handleRatingChange("valueRating", value)}
        />
      </div>
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Review
        </label>
        <Textarea
          id="comment"
          value={review.comment}
          onChange={handleCommentChange}
          rows={4}
          placeholder="Share your experience..."
          className="w-full"
        />
      </div>
      <Button type="submit" disabled={createReviewMutation.isPending}>
        {createReviewMutation.isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
