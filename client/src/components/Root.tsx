import { useState } from "react";
import {
  RestaurantsContext,
  Restaurant,
} from "../pages/RestaurantList/RestaurantsContext";
import { Outlet } from "react-router-dom";
import { User } from "../context/UsersContext";

// Component Imports
import NavBar from "./NavBar";

type RootProps = {
  setToastToggle: (toastToggle: boolean) => void;
  user: User;
};

function Root({ setToastToggle, user }: RootProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  return (
    <>
      {user ? <NavBar setToastToggle={setToastToggle} /> : null}
      <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
        <Outlet />
      </RestaurantsContext.Provider>
    </>
  );
}

export default Root;
