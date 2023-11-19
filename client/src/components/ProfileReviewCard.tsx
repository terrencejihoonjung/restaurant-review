import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Review } from "../context/ReviewsContext";
import Heart from "./Heart";

type ReviewProps = {
  review: Review;
};

function ReviewCard({ review }: ReviewProps) {
  const [likeToggle, setLikeToggle] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(review.likes);

  async function checkIfUserLiked() {
    try {
      const response = await fetch(
        `http://54.67.56.212:3000/restaurants/${review.restaurant_id}/reviews/${review.id}/likes`,
        {
          credentials: "include",
        }
      );
      const jsonData = await response.json();

      if (response.ok) {
        if (jsonData.liked) {
          setLikeToggle(true);
        } else {
          setLikeToggle(false);
        }
      } else {
        throw new Error(jsonData.message);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function handleLike() {
    try {
      if (!likeToggle) {
        const response = await fetch(
          `http://54.67.56.212:3000/restaurants/${review.restaurant_id}/reviews/${review.id}/like`,
          {
            credentials: "include",
            method: "POST",
          }
        );
        const jsonData = await response.json();

        if (response.ok) {
          if (jsonData.liked) {
            setLikeToggle(true);
            setCurrentLikeCount((currentLikeCount) => currentLikeCount + 1);
          } else {
            setLikeToggle(false);
          }
        } else {
          throw new Error(jsonData.message);
        }
      } else {
        const response = await fetch(
          `http://54.67.56.212:3000/restaurants/${review.restaurant_id}/reviews/${review.id}/dislike`,
          {
            credentials: "include",
            method: "POST",
          }
        );
        const jsonData = await response.json();

        if (response.ok) {
          if (jsonData.liked) {
            setLikeToggle(true);
          } else {
            setLikeToggle(false);
            setCurrentLikeCount((currentLikeCount) => currentLikeCount - 1);
          }
        } else {
          throw new Error(jsonData.message);
        }
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  useEffect(() => {
    checkIfUserLiked();
  }, []);

  return (
    <>
      <div className="card w-72 h-64 bg-base-100 shadow-xl">
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
            <span className="flex items-center">
              <button onClick={() => handleLike()}>
                <Heart likeToggle={likeToggle} />
              </button>
              {currentLikeCount}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
