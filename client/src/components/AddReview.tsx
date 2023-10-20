import { useState } from "react";
import { useParams } from "react-router-dom";

type Review = {
  name: string;
  rating: number;
  review: string;
  date: Date;
  readonly id: number;
  readonly restaurant_id: number;
};

type AddReviewProps = {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
};

function AddReview({ reviews, setReviews }: AddReviewProps) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");

  const starStyles = `mask mask-star-2 bg-orange-400 ${
    rating === "" ? "opacity-20" : ""
  }`;

  async function handleReviewSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (name === "" || rating === "" || review === "") {
        throw new Error("Please fill in empty fields");
      }

      const reviewBody = {
        name,
        rating,
        review,
      };
      const response = await fetch(
        `http://localhost:3000/restaurants/${id}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewBody),
        }
      );
      const jsonData = await response.json();
      setReviews([...reviews, jsonData]);
      window.location.reload();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        console.error(err);
      }
    }
  }

  return (
    <div className="px-24 w-1/2 my-8">
      <h1 className="text-3xl font-inter font-black">Add Review</h1>
      {error ? (
        <div className="alert alert-warning my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{error}</span>
        </div>
      ) : null}
      <form className="flex flex-col" onSubmit={handleReviewSubmit}>
        <div className="rating my-2">
          <input
            type="radio"
            name="rating-2"
            value={1}
            onChange={(e) => setRating(e.target.value)}
            className={starStyles}
            checked={rating === "1" && rating.length > 0}
          />
          <input
            type="radio"
            name="rating-2"
            value={2}
            onChange={(e) => setRating(e.target.value)}
            className={starStyles}
            checked={rating === "2" && rating.length > 0}
          />
          <input
            type="radio"
            name="rating-2"
            value={3}
            onChange={(e) => setRating(e.target.value)}
            className={starStyles}
            checked={rating === "3" && rating.length > 0}
          />
          <input
            type="radio"
            name="rating-2"
            value={4}
            onChange={(e) => setRating(e.target.value)}
            className={starStyles}
            checked={rating === "4" && rating.length > 0}
          />
          <input
            type="radio"
            name="rating-2"
            value={5}
            onChange={(e) => setRating(e.target.value)}
            className={starStyles}
            checked={rating === "5" && rating.length > 0}
          />
        </div>
        <input
          type="text"
          placeholder="Name"
          className={`input font-inter input-bordered my-2 max-w-full + ${
            error && !name ? "input-error" : ""
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className={`my-2 textarea font-inter textarea-bordered + ${
            error && !review ? "textarea-error" : ""
          }`}
          placeholder="Type Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button className="btn btn-outline btn-warning">Add</button>
      </form>
    </div>
  );
}

export default AddReview;
