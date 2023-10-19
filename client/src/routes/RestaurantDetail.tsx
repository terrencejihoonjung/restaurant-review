import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Restaurant } from "../context/RestaurantsContext";
import StarRating from "../components/StarRating";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";

type Review = {
  name: string;
  rating: number;
  review: string;
  readonly id: number;
  readonly restaurant_id: number;
};

function RestaurantDetail() {
  const { id } = useParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(
    {} as Restaurant
  );
  const [reviews, setReviews] = useState<Review[]>([] as Review[]);

  async function getRestaurant() {
    try {
      const response = await fetch(`http://localhost:3000/restaurants/${id}`, {
        method: "GET",
      });
      const jsonData = await response.json();
      setSelectedRestaurant(jsonData.data.restaurant);
      setReviews(jsonData.data.reviews);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      } else {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <>
      <Link
        to="/restaurants"
        className="px-24 font-inter font-black text-sm breadcrumbs"
      >
        {"< Back"}
      </Link>
      <h1 className="w-fit font-inter font-black text-4xl px-24 mt-3 bg-gradient-to-r from-fuchsia-500 to-yelp-red text-transparent bg-clip-text">
        {selectedRestaurant.name}
      </h1>
      <div className="flex items-center px-24 text-2xl">
        <StarRating rating={selectedRestaurant.avg_rating} />
        {selectedRestaurant.review_count ? (
          <span className="font-inter font-black ml-2">
            ({selectedRestaurant.review_count})
          </span>
        ) : (
          <span className="font-inter font-black ml-2">(0)</span>
        )}
      </div>
      <AddReview reviews={reviews} setReviews={setReviews} />
      <div>
        {selectedRestaurant.name && (
          <>
            <div>
              <Reviews reviews={reviews} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default RestaurantDetail;
