import { useState } from "react";
import { useRestaurantsContext } from "../context/RestaurantsContext";

function AddRestaurant() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const [error, setError] = useState("");

  const { restaurants, setRestaurants } = useRestaurantsContext();

  function resetFields() {
    setName("");
    setLocation("");
    setPriceRange("Price Range");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (name === "" || location === "" || priceRange === "Price Range") {
        throw new Error("Please fill in empty fields");
      }

      const body = {
        name,
        location,
        price_range: priceRange,
      };

      const response = await fetch("http://localhost:3000/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      setRestaurants([...restaurants, jsonData]);
      resetFields();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
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
      {error ? (
        <div className="alert alert-warning mb-4">
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
    </>
  );
}

export default AddRestaurant;
