// Tool Imports
import { Routes, Route, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  async function getUser() {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        credentials: "include",
      });
      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData.loggedIn) {
        setUser(jsonData.user);
        navigate("/restaurants");
      } else {
        navigate("/users");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      } else {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container min-w-full min-h-full">
      <NavBar user={user} />
      <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
        <Routes>
          <Route
            index
            element={user.id ? <Home /> : <UserAuth setUser={setUser} />}
          />
          {user.id ? (
            <>
              <Route path="/restaurants" element={<Home />} />
              <Route path="/restaurants/:id" element={<RestaurantDetail />} />
              <Route
                path="/restaurants/:id/update"
                element={<UpdateRestaurant />}
              />
            </>
          ) : (
            <Route path="/users" element={<UserAuth setUser={setUser} />} />
          )}

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </RestaurantsContext.Provider>
    </div>
  );
}

export default App;
