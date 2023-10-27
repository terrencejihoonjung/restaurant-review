function User() {
  return (
    <>
      <div className="flex flex-col items-center pt-12">
        <div className="card w-1/4 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Create an Account</h2>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="card-actions justify-start mt-2">
              <button className="btn">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
