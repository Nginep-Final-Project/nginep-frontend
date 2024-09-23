import axios from "axios";
import { CreateReviewDto, ReviewDto } from "@/types/review";

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