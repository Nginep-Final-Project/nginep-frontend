import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createReview,
  createReviewReply,
  getReviewsByPropertyId,
  getUserReviews,
} from "@/services/reviewService";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { response } from "@/types/response";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewDto"] });
      toast({
        title: "Review Created",
        description: "The review has been created and submitted.",
      });
    },
    onError: (error: AxiosError) => {
      const getErrorMessage = (error: unknown): string | null => {
        if (error instanceof AxiosError && error.response) {
          const apiError = error.response.data as response;
          return apiError.data || apiError.message;
        }
        return "An error occurred while creating the review";
      };

      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error),
      });
    },
  });
};

export const useUserReviews = () => {
  return useQuery({
    queryKey: ["reviewDto"],
    queryFn: () => getUserReviews(),
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
    onError: (error: AxiosError) => {
      const getErrorMessage = (error: unknown): string | null => {
        if (error instanceof AxiosError && error.response) {
          const apiError = error.response.data as response;
          return apiError.data || apiError.message;
        }
        return "An error occurred while creating the reply for the review";
      };

      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error),
      });
    },
  });
};
