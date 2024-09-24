import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReviewReply } from "@/hooks/review/useReviews";

interface ReviewReplyFormProps {
  reviewId: number;
  tenantId: number;
  onSuccess: () => void;
}

const ReviewReplyForm: React.FC<ReviewReplyFormProps> = ({ reviewId, tenantId, onSuccess }) => {
  const [reply, setReply] = useState("");
  const createReplyMutation = useCreateReviewReply();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReplyMutation.mutateAsync({
        reviewId,
        tenantId,
        reply,
      });
      setReply("");
      onSuccess();
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <Textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write your reply..."
        className="w-full mb-2"
      />
      <Button type="submit" disabled={createReplyMutation.isPending}>
        {createReplyMutation.isPending ? "Submitting..." : "Submit Reply"}
      </Button>
    </form>
  );
};

export default ReviewReplyForm;