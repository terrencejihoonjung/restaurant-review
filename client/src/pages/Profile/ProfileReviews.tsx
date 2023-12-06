import { Review } from "../RestaurantDetail/ReviewsContext";
import ProfileReviewCard from "./ProfileReviewCard";

type ReviewRefProps = {
  reviews: Review[];
};

const Reviews = ({ reviews }: ReviewRefProps) => {
  return (
    <div className="mt-32">
      <h1 className="card-title mb-4 ml-4">My Reviews</h1>
      <div className="grid grid-cols-3 justify-items-center gap-4 mb-64 overflow-y-auto max-h-screen">
        {reviews.map((review) => (
          <ProfileReviewCard review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
