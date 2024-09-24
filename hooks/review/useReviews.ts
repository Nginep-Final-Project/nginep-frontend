import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, createReviewReply, getReviewsByPropertyId, getUserReviews } from "@/services/reviewService";
import { toast } from "@/components/ui/use-toast";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewDto"] });
      toast({
        title: "Review Created",
        description:
          "The review has been created and submitted.",
      });
    },
    onError: () => {
        toast({
          title: "Error",
          description: "Failed to create the review. Please try again.",
          variant: "destructive",
        });
      },
  });
};

export const useUserReviews = (userId: number) => {
  return useQuery({
    queryKey: ["reviewDto", userId],
    queryFn: () => getUserReviews(userId),
  });
};

export const usePropertyReviews = (propertyId: number) => {
  return useQuery({
    queryKey: ["propertyReviews", propertyId],
    queryFn: () => getReviewsByPropertyId(propertyId),
  });
};

export const useCreateReviewReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReviewReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyReviews"] });
      toast({
        title: "Success",
        description: "Reply submitted successfully",
      });
    },
    onError: (error) => {
      console.error("Error submitting reply:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit reply. Please try again.",
      });
    },
  });
};