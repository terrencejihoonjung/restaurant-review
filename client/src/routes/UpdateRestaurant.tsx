import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateRestaurant() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const navigate = useNavigate();

  async function getRestaurant() {
    try {
      const response = await fetch(`http://localhost:3000/restaurants/${id}`, {
        method: "GET",
      });
      const jsonData = await response.json();
      setName(jsonData.name);
      setLocation(jsonData.location);
      setPriceRange(jsonData.price_range);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      } else {
        console.error(err);
      }
    }
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const body = { name, location, price_range: priceRange };
      await fetch(`http://localhost:3000/restaurants/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      navigate("/restaurants");
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
      <div className="flex flex-col items-center pt-12">
        <h1 className="mb-9 font-inter font-black text-4xl bg-gradient-to-r from-fuchsia-500 to-yelp-red text-transparent bg-clip-text text-center">
          Update Restaurant
        </h1>

        <form onSubmit={(e) => handleUpdate(e)} className="w-2/5">
          <input
            type="text"
            placeholder="Restaurant Name"
            className="input input-bordered w-full my-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="input input-bordered w-full my-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select
            className="select select-bordered w-full my-3"
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
