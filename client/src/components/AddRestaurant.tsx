function AddRestaurant() {
  return (
    <>
      <form className="flex justify-center space-x-12 py-6">
        <input
          type="text"
          placeholder="Restaurant Name"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Location"
          className="input input-bordered w-full max-w-xs"
        />
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Price Range
          </option>
          <option>$</option>
          <option>$$</option>
          <option>$$$</option>
          <option>$$$$</option>
          <option>$$$$$</option>
        </select>

        <button className="btn font-inter text-white-100 bg-gradient-to-r from-fuchsia-500 to-yelp-red">
          Add
        </button>
      </form>
    </>
  );
}

export default AddRestaurant;
