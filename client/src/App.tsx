// Tool Imports
// import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Component Imports
import Home from "./routes/Home";
// import RestaurantDetail from "./routes/RestaurantDetail";
// import UpdateRestaurant from "./routes/UpdateRestaurant";
import NoMatch from "./routes/NoMatch";

function App() {
  // const [restaurants, setRestaurants] = useState([]);
  return (
    <>
      <Routes>
        <Route index element={<Home />} />

        <Route path="/restaurants" element={<Home />} />
        {/* <Route path="/restaurants/:id" element={<RestaurantDetail />}>
          <Route path="/update" element={<UpdateRestaurant />} />
        </Route> */}

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
