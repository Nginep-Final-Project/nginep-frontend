import axios from "axios";
import {
  CreateReviewDto,
  CreateReviewReplyDto,
  ReviewDto,
  ReviewReplyDto,
} from "@/types/review";

const hostnameApi = process.env.NEXT_PUBLIC_HOSTNAME_API;
const prefixApi = process.env.NEXT_PUBLIC_PREFIX_API;

export const createReview = async (
  reviewData: CreateReviewDto
): Promise<ReviewDto> => {
  try {
    const response = await axios.post<{ data: ReviewDto }>(
      `${hostnameApi}/${prefixApi}/reviews/create`,
      reviewData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const getUserReviews = async (): Promise<ReviewDto[]> => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('sid='))?.split('=')[1];
    const response = await axios.get<{ data: ReviewDto[] }>(
      `${hostnameApi}/${prefixApi}/reviews/user`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    throw error;
  }
};

export const getReviewsByPropertyId = async (
  propertyId: number
): Promise<ReviewDto[]> => {
  try {
    const response = await axios.get<{ data: ReviewDto[] }>(
      `${hostnameApi}/${prefixApi}/reviews/property/${propertyId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching property reviews:", error);
    throw error;
  }
};

export const createReviewReply = async (
  replyData: CreateReviewReplyDto
): Promise<ReviewReplyDto> => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('sid='))?.split('=')[1];
    const response = await axios.post<{ data: ReviewReplyDto }>(
      `${hostnameApi}/${prefixApi}/review-replies/create`,
      replyData,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating review reply:", error);
    throw error;
  }
};
