import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Restaurant } from "../context/RestaurantsContext";
import StarRating from "../components/StarRating";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import { Review } from "../context/ReviewsContext";

function RestaurantDetail() {
  const { id } = useParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(
    {} as Restaurant
  );
  const [reviews, setReviews] = useState<Review[]>([] as Review[]);
  const [sortKeyword, setSortKeyword] = useState("recent");
  const sortedReviews = sortReviews();

  function sortReviews(): Review[] {
    const copyReviews = [...reviews];

    if (sortKeyword === "recent") {
      return copyReviews.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }
    return copyReviews.sort((a, b) => {
      return sortKeyword === "highest"
        ? b.rating - a.rating
        : a.rating - b.rating;
    });
  }

  async function getRestaurant() {
    try {
      const response = await fetch(`http://localhost:3000/restaurants/${id}`, {
        method: "GET",
      });
      const jsonData = await response.json();
      setSelectedRestaurant(jsonData.data.restaurant);
      setReviews(jsonData.data.reviews);
    } catch (err: unknown) {
      console.error(err);
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
      <AddReview />
      <div>
        {selectedRestaurant.name && (
          <>
            <select
              onChange={(e) => setSortKeyword(e.target.value)}
              className="mx-24 select select-ghost w-fit max-w-xs"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest</option>
              <option value="lowest">Lowest</option>
            </select>
            <div>
              <Reviews sortedReviews={sortedReviews} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default RestaurantDetail;
