import { useEffect } from "react";
import { useRestaurantsContext } from "../context/RestaurantsContext";

function RestaurantList() {
  const { restaurants, setRestaurants } = useRestaurantsContext();

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

  async function deleteRestaurant(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/restaurants/${id}`, {
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
                  <tr key={restaurant.id} className="hover">
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    <th>reviews</th>
                    <td>
                      <button className="btn btn-outline btn-warning">
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteRestaurant(restaurant.id)}
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
