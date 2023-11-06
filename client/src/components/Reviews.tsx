import { SortedReviewProps } from "../context/ReviewsContext";
import ReviewCard from "./ReviewCard";

function Reviews({ sortedReviews }: SortedReviewProps) {
  return (
    <>
      <div className="grid grid-cols-3 justify-items-center gap-4 px-24 py-6 overflow-y-auto max-h-scren">
        {sortedReviews.map((review) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>
    </>
  );
}

export default Reviews;
