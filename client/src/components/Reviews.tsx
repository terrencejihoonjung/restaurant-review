import StarRating from "../components/StarRating";
import { SortedReviewProps } from "../context/ReviewsContext";

function Reviews({ sortedReviews }: SortedReviewProps) {
  // array of review ids that were liked
  // state that tracks toggled like button

  // on component dismount (clean up function of a useEffect), we can do a post request and add the likes to each review
  // using array of review ids

  // if a user clicks the like button -> toggle icon and like count and add review id to array state
  // if a user unclicks like button -> toggle icon and like count and remove review id from array state

  // ISSUE: i can use a likes join table to save user liked reviews but need to figure out how to unlike too
  return (
    <>
      <div className="grid grid-cols-3 justify-items-center gap-4 px-24 py-6 overflow-y-auto max-h-scren">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="card w-full h-64 bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <span className="flex items-center justify-between">
                <h2 className="card-title">{review.name}</h2>
                <StarRating rating={review.rating} />
              </span>
              <span className="italic text-xs opacity-50">
                Reviewed on {new Date(review.date).toLocaleString()} by{" "}
                {review.author}
              </span>
              <p className="line-clamp-4">{review.review}</p>

              <span className="flex flex-row-reverse font-black text-s">
                {review.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Reviews;
