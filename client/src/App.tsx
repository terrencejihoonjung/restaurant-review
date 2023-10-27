// Tool Imports
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { RestaurantsContext, Restaurant } from "./context/RestaurantsContext";

// Component Imports
import Home from "./routes/Home";
import NoMatch from "./routes/NoMatch";
import User from "./routes/User";
import NavBar from "./components/NavBar";
import RestaurantDetail from "./routes/RestaurantDetail";
import UpdateRestaurant from "./routes/UpdateRestaurant";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  return (
    <div className="container min-w-full min-h-full">
      <NavBar />
      <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
        <Routes>
          <Route index element={<Home />} />

          <Route path="/users" element={<User />} />

          <Route path="/restaurants" element={<Home />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route
            path="/restaurants/:id/update"
            element={<UpdateRestaurant />}
          />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </RestaurantsContext.Provider>
    </div>
  );
}

export default App;
