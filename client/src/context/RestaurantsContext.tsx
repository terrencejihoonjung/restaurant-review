import { useState, createContext } from "react";

const RestaurantsContext = createContext();

function RestaurantContextProvider(props: React.ComponentType) {
  const [restaurants, setRestaurants] = useState([]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
      {props.children}
    </RestaurantsContext.Provider>
  );
}

export default RestaurantContextProvider;
