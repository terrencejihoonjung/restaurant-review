import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateRestaurant() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function getRestaurant() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurants/${id}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setName(data.restaurant.name);
      setLocation(data.restaurant.location);
      setPriceRange(data.restaurant.price_range);
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (name === "" || location === "" || priceRange === "Price Range") {
        throw new Error("Please fill in empty fields");
      }

      const body = { name, location, price_range: priceRange };
      await fetch(`http://localhost:3000/api/restaurants/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      navigate("/restaurants");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  useEffect(() => {
    getRestaurant();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center pt-12">
        <h1 className="mb-9 font-inter font-black text-4xl bg-gradient-to-r from-fuchsia-500 to-yelp-red text-transparent bg-clip-text text-center">
          Update Restaurant
        </h1>

        <form onSubmit={(e) => handleUpdate(e)} className="w-2/5">
          {error ? (
            <div className="alert alert-warning mb-4 w-full">
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
          <input
            type="text"
            placeholder="Restaurant Name"
            className={`input input-bordered w-full my-3 + ${
              error && !name ? "input-error" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className={`input input-bordered w-full my-3 + ${
              error && !location ? "input-error" : ""
            }`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select
            className="input input-bordered w-full my-3"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value={1}>$</option>
            <option value={2}>$$</option>
            <option value={3}>$$$</option>
            <option value={4}>$$$$</option>
            <option value={5}>$$$$$</option>
          </select>

          <button className="w-full my-6 block btn font-inter text-white-100 bg-gradient-to-r from-fuchsia-500 to-yelp-red">
            Update
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateRestaurant;
