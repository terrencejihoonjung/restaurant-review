import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useState, useEffect } from "react";

import { UsersContext, User } from "./context/UsersContext";

// Component Imports
import Home from "./pages/Home/Home";
import NoMatch from "./pages/ErrorBoundary/NoMatch";
import UserAuth from "./pages/Auth/UserAuth";
import RestaurantDetail from "./pages/RestaurantDetail/RestaurantDetail";
import UpdateRestaurant from "./pages/RestaurantList/UpdateRestaurant";
import Profile from "./pages/Profile/Profile";
import Root from "./components/Root.tsx";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [toastToggle, setToastToggle] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root user={user} setToastToggle={setToastToggle} />}>
        {user ? (
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
      </Route>
    )
  );

  async function getUser() {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="inset-0 min-h-screen min-w-screen">
      <UsersContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UsersContext.Provider>

      {toastToggle ? (
        <div className="toast">
          <div className="alert alert-success">
            <span>
              {user ? "Successfully Logged In" : "Successfully Logged Out"}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
