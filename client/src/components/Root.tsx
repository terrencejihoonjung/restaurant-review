import { useState } from "react";
import {
  RestaurantsContext,
  Restaurant,
} from "../pages/RestaurantList/RestaurantsContext";
import { Outlet } from "react-router-dom";

// Component Imports
import NavBar from "./NavBar";

type RootProps = {
  setToastToggle: (toastToggle: boolean) => void;
};

function Root({ setToastToggle }: RootProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  return (
    <>
      <NavBar setToastToggle={setToastToggle} />
      <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
        <Outlet />
      </RestaurantsContext.Provider>
    </>
  );
}

export default Root;
