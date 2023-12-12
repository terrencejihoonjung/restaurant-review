import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Restaurant } from "../RestaurantList/RestaurantsContext";
import StarRating from "../../components/ui/StarRating";
import AddReview from "./AddReview";
import Reviews from "./Reviews";
import { Review } from "./ReviewsContext";

function RestaurantDetail() {
  const { id } = useParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(
    {} as Restaurant
  );
  const [reviews, setReviews] = useState<Review[]>([] as Review[]);
  const [sortKeyword, setSortKeyword] = useState("recent");

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

  let sortedReviews = useMemo(() => sortReviews(), [reviews]);

  async function getRestaurant() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurants/${id}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      setSelectedRestaurant(data.restaurant);
      setReviews(data.reviews);
    } catch (err: unknown) {
      console.error(err);
    }
  }

  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <div className="pt-24">
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
    </div>
  );
}

export default RestaurantDetail;
