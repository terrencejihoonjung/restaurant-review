import StarRating from "../components/StarRating";
import { SortedReviewProps } from "../context/ReviewsContext";

function Reviews({ sortedReviews }: SortedReviewProps) {
  return (
    <>
      <div className="grid grid-cols-3 justify-items-center gap-4 px-24 py-6 overflow-y-auto max-h-scren">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="card w-full h-56 bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <span className="flex items-center justify-between">
                <h2 className="card-title">{review.name}</h2>
                <StarRating rating={review.rating} />
              </span>
              <span className="italic text-xs opacity-50">
                Reviewed on {new Date(review.date).toLocaleString()}
              </span>
              <p className="line-clamp-4">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Reviews;
