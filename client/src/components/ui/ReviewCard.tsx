import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import {
  Review,
  ReviewLiker,
} from "../../pages/RestaurantDetail/ReviewsContext";
import Heart from "./Heart";
import LikerRow from "./LikerRow";

type ReviewProps = {
  review: Review;
};

function ReviewCard({ review }: ReviewProps) {
  const [likeToggle, setLikeToggle] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(review.likes);
  const [likers, setLikers] = useState<ReviewLiker[]>([]);

  async function getLikes() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurants/${review.restaurant_id}/reviews/${review.id}/likes`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.liked) {
          setLikeToggle(true);
        } else {
          setLikeToggle(false);
        }
        setLikers(data.likers);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function handleLike() {
    try {
      // Like
      if (!likeToggle) {
        const response = await fetch(
          `http://localhost:3000/api/restaurants/${review.restaurant_id}/reviews/${review.id}/like`,
          {
            credentials: "include",
            method: "POST",
          }
        );
        const data = await response.json();

        if (response.ok) {
          if (data.liked) {
            setLikeToggle(true);
            setCurrentLikeCount((currentLikeCount) => currentLikeCount + 1);
          } else {
            setLikeToggle(false);
          }
        }
      }

      // Dislike
      else {
        const response = await fetch(
          `http://localhost:3000/api/restaurants/${review.restaurant_id}/reviews/${review.id}/dislike`,
          {
            credentials: "include",
            method: "POST",
          }
        );
        const data = await response.json();

        if (response.ok) {
          if (data.liked) {
            setLikeToggle(true);
          } else {
            setLikeToggle(false);
            setCurrentLikeCount((currentLikeCount) => currentLikeCount - 1);
          }
        }
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  useEffect(() => {
    getLikes();
  }, [currentLikeCount]);

  return (
    <>
      <div className="card w-full h-64 bg-base-100 shadow-xl">
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
              <button className="px-1" onClick={() => handleLike()}>
                <Heart likeToggle={likeToggle} />
              </button>
              <a
                onClick={() => {
                  const modal = document.getElementById(
                    `${"modal_" + review.id}`
                  ) as HTMLDialogElement;
                  if (modal) modal.showModal();
                }}
                className="link"
              >
                {currentLikeCount}
              </a>
            </span>
          </span>
        </div>
      </div>

      <dialog id={"modal_" + review.id} className="modal">
        <div className="modal-box">
          <div className="overflow-x-auto">
            <h3 className="font-bold text-lg">Likes</h3>
            <table className="table">
              <tbody>
                {likers.map((liker) => {
                  return <LikerRow key={liker.id} liker={liker} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default ReviewCard;
