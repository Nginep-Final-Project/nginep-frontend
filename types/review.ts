export interface CreateReviewDto {
  bookingId: number;
  cleanlinessRating: number;
  communicationRating: number;
  checkInRating: number;
  accuracyRating: number;
  locationRating: number;
  valueRating: number;
  comment: string;
}

export interface ReviewDto {
  id: number;
  bookingId: number;
  propertyName: string;
  fullName: string;
  cleanlinessRating: number;
  communicationRating: number;
  checkInRating: number;
  accuracyRating: number;
  locationRating: number;
  valueRating: number;
  comment: string;
  averageRating: number;
  createdAt: string;
  reply?: ReviewReplyDto;
}

export interface ReviewReplyDto {
  id: number;
  reviewId: number;
  tenantId: number;
  tenantName: string;
  reply: string;
  createdAt: string;
}

export interface CreateReviewReplyDto {
  reviewId: number;
  tenantId: number;
  reply: string;
}