// Tool Imports
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  RestaurantsContext,
  Restaurant,
} from "./pages/RestaurantList/RestaurantsContext";
import { UsersContext, User } from "./context/UsersContext";

// Component Imports
import Home from "./pages/Home/Home";
import NoMatch from "./pages/ErrorBoundary/NoMatch";
import UserAuth from "./pages/Auth/UserAuth";
import NavBar from "./components/NavBar";
import RestaurantDetail from "./pages/RestaurantDetail/RestaurantDetail";
import UpdateRestaurant from "./pages/RestaurantList/UpdateRestaurant";
import Profile from "./pages/Profile/Profile";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [user, setUser] = useState<User>({} as User);
  const [toastToggle, setToastToggle] = useState(false);
  const navigate = useNavigate();

  async function getUser() {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      } else {
        navigate("/users");
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container min-w-full min-h-full">
      <UsersContext.Provider value={{ user, setUser }}>
        <NavBar setToastToggle={setToastToggle} />
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
          <Routes>
            {user.id ? (
              <>
                <Route index element={<Home />} />
                <Route path="/restaurants" element={<Home />} />
                <Route path="/restaurants/:id" element={<RestaurantDetail />} />
                <Route
                  path="/restaurants/:id/update"
                  element={<UpdateRestaurant />}
                />
                <Route path="/profile/:userId" element={<Profile />} />
              </>
            ) : (
              <Route
                path="/users"
                element={<UserAuth setToastToggle={setToastToggle} />}
              />
            )}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </RestaurantsContext.Provider>
      </UsersContext.Provider>
      {toastToggle ? (
        <div className="toast">
          <div className="alert alert-success">
            <span>
              {user.id ? "Successfully Logged In" : "Successfully Logged Out"}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
