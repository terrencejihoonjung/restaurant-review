import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Restaurant } from "../context/RestaurantsContext";

function RestaurantDetail() {
  const { id } = useParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(
    {} as Restaurant
  );

  console.log(id);

  async function getRestaurant() {
    try {
      const response = await fetch(`http://localhost:3000/restaurants/${id}`, {
        method: "GET",
      });
      const jsonData = await response.json();
      setSelectedRestaurant(jsonData);
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
      <div>{selectedRestaurant.name}</div>
    </>
  );
}

export default RestaurantDetail;
