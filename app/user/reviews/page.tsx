"use client";

import React, { useState } from "react";
import { useUserReviews } from "@/hooks/review/useReviews";
import { useUnreviewedBookings } from "@/hooks/booking/user/useUnreviewedBookings";
import ReviewList from "./_components/ReviewList";
import SkeletonReviewList from "./_components/SkeletonReviewList";
import ReviewForm from "./_components/ReviewForm";
import UnreviewedBookings from "./_components/UnreviewedBookings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";

const UserReviews: React.FC = () => {
  const { data: session } = useSession();
  const userIdString = session?.user?.id;
  const userId = userIdString ? parseInt(userIdString, 10) : undefined;

  if (userId === undefined || isNaN(userId)) {
    return <div>Please log in to see your reviews</div>;
  }
  
  const { data: reviews, isLoading, error, refetch } = useUserReviews(userId);
  const { data: unreviewedBookings, isLoading: isLoadingBookings } =
    useUnreviewedBookings(userId);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );

  const handleReviewSuccess = () => {
    setIsReviewFormOpen(false);
    refetch();
  };

  const handleSelectBooking = (bookingId: number) => {
    setSelectedBookingId(bookingId);
    setIsReviewFormOpen(true);
  };

  if (isLoading || isLoadingBookings) return <SkeletonReviewList />;
  if (error)
    return (
      <div className="min-h-screen">
        Error loading reviews. Please try again later.
      </div>
    );

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Reviews</h1>

      {unreviewedBookings && unreviewedBookings.length > 0 && (
        <UnreviewedBookings
          bookings={unreviewedBookings}
          onSelectBooking={handleSelectBooking}
        />
      )}

      <Dialog open={isReviewFormOpen} onOpenChange={setIsReviewFormOpen}>
        <DialogContent className="bg-white rounded-lg">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          {selectedBookingId && (
            <ReviewForm
              bookingId={selectedBookingId}
              onSuccess={handleReviewSuccess}
            />
          )}
        </DialogContent>
      </Dialog>

      {reviews && reviews.length > 0 ? (
        <ReviewList reviews={reviews} />
      ) : (
        <p>You haven't written any reviews yet.</p>
      )}
    </div>
  );
};

export default UserReviews;
