function RestaurantList() {
  return (
    <>
      <div className="overflow-x-auto flex p-4 border rounded-2xl border-slate-200 shadow-lg">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Location</th>
              <th>Price Range</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>
                <button className="btn btn-outline btn-warning">Edit</button>
              </td>
              <td>
                <button className="btn btn-outline btn-error">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RestaurantList;
