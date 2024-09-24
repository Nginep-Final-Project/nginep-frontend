import axios from "axios";
import { CreateReviewDto, CreateReviewReplyDto, ReviewDto, ReviewReplyDto } from "@/types/review";

export const createReview = async (
  reviewData: CreateReviewDto
): Promise<ReviewDto> => {
  try {
    const response = await axios.post<{ data: ReviewDto }>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews`,
      reviewData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const getUserReviews = async (userId: number): Promise<ReviewDto[]> => {
  try {
    const response = await axios.get<{ data: ReviewDto[] }>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/user/${userId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    throw error;
  }
};

export const getReviewsByPropertyId = async (propertyId: number): Promise<ReviewDto[]> => {
  try {
    const response = await axios.get<{ data: ReviewDto[] }>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/reviews/property/${propertyId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching property reviews:", error);
    throw error;
  }
};

export const createReviewReply = async (replyData: CreateReviewReplyDto): Promise<ReviewReplyDto> => {
  try {
    const response = await axios.post<{ data: ReviewReplyDto }>(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/review-replies`,
      replyData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating review reply:", error);
    throw error;
  }
};