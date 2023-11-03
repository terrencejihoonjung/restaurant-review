// Tool Imports
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { RestaurantsContext, Restaurant } from "./context/RestaurantsContext";

// Component Imports
import Home from "./routes/Home";
import NoMatch from "./routes/NoMatch";
import UserAuth from "./routes/UserAuth";
import NavBar from "./components/NavBar";
import RestaurantDetail from "./routes/RestaurantDetail";
import UpdateRestaurant from "./routes/UpdateRestaurant";

type User = {
  id: number;
  username: string;
  email: string;
};

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [user, setUser] = useState<User>({} as User);

  // async function getUser() {
  //   try {
  //     const response = await fetch("");
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.error(err);
  //     } else {
  //       console.error(err);
  //     }
  //   }
  // }

  useEffect(() => {}, []);

  return (
    <div className="container min-w-full min-h-full">
      <NavBar />
      <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
        <Routes>
          <Route path="/users" element={<UserAuth setUser={setUser} />} />

          <>
            <Route index element={<Home />} />
            <Route path="/restaurants" element={<Home />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route
              path="/restaurants/:id/update"
              element={<UpdateRestaurant />}
            />
          </>

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </RestaurantsContext.Provider>
    </div>
  );
}

export default App;
