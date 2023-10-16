import { useState } from "react";
import { useRestaurantsContext } from "../context/RestaurantsContext";

function AddRestaurant() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const { restaurants, setRestaurants } = useRestaurantsContext();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const body = { name, location, price_range: priceRange };
      const response = await fetch("http://localhost:3000/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      setRestaurants([...restaurants, jsonData]);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      } else {
        console.error(err);
      }
    }
  }

  return (
    <>
      <form
        className="flex justify-center space-x-12 py-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Restaurant Name"
          className="input input-bordered w-full max-w-xs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="input input-bordered w-full max-w-xs"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option disabled>Price Range</option>
          <option value={1}>$</option>
          <option value={2}>$$</option>
          <option value={3}>$$$</option>
          <option value={4}>$$$$</option>
          <option value={5}>$$$$$</option>
        </select>

        <button className="btn font-inter text-white-100 bg-gradient-to-r from-fuchsia-500 to-yelp-red">
          Add
        </button>
      </form>
    </>
  );
}

export default AddRestaurant;
