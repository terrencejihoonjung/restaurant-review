import { Link, useNavigate } from "react-router-dom";
import { useUsersContext, User } from "../context/UsersContext";
import Socials from "./ui/Socials";
import Avatar from "./ui/Avatar";

type NavBarProps = {
  setToastToggle: (toastToggle: boolean) => void;
};

const iconStyle: string = "w-8 rounded-full";

function NavBar({ setToastToggle }: NavBarProps) {
  const navigate = useNavigate();
  const { user, setUser } = useUsersContext();

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        navigate("/users");
        setToastToggle(true);
        setTimeout(() => {
          // After 3 seconds set the show value to false
          setToastToggle(false);
        }, 3000);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  }

  return (
    <div className="navbar absolute bg-base-100">
      <div className="flex-1">
        <Link
          to={user ? "/restaurants" : "/users"}
          className="btn btn-ghost normal-case text-xl bg-gradient-to-r from-fuchsia-500 to-yelp-red text-transparent bg-clip-text"
        >
          RR
        </Link>
        {user ? <p>Logged in as: {user.username}</p> : null}
      </div>

      <div className="flex items-center">
        {user ? (
          <>
            {/* <Notifications /> */}
            <Link to={`/profile/${user.id}`} className="flex items-center mx-2">
              <Avatar iconStyle={iconStyle} />
            </Link>

            <button
              onClick={() => handleLogout()}
              className="btn btn-sm btn-outline mx-2 text-yelp-red hover:bg-gradient-to-r from-fuchsia-500 to-yelp-red hover:text-slate-50 hover:border-slate-50"
            >
              Logout
            </button>
          </>
        ) : null}{" "}
        <Socials />
      </div>
    </div>
  );
}

export default NavBar;
