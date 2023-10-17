import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurantsContext } from "../context/RestaurantsContext";

function RestaurantList() {
  const { restaurants, setRestaurants } = useRestaurantsContext();
  const navigate = useNavigate();

  async function getRestaurants() {
    try {
      const response = await fetch("http://localhost:3000/restaurants");
      const jsonData = await response.json();
      setRestaurants(jsonData.data);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      } else {
        console.error(err);
      }
    }
  }

  async function navigateToUpdate(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  }

  async function deleteRestaurant(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) {
    e.stopPropagation();
    try {
      await fetch(`http://localhost:3000/restaurants/${id}`, {
        method: "DELETE",
      });
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      } else {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <>
      <div className="overflow-x-auto flex p-4 border rounded-2xl border-slate-200 shadow-lg">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Price Range</th>
              <th>Reviews</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {restaurants &&
              restaurants.map((restaurant) => {
                return (
                  <tr
                    key={restaurant.id}
                    className="hover"
                    onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                  >
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    <th>reviews</th>
                    <td>
                      <button
                        onClick={(e) => navigateToUpdate(e, restaurant.id)}
                        className="btn btn-outline btn-warning"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={(e) => deleteRestaurant(e, restaurant.id)}
                        className="btn btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RestaurantList;
