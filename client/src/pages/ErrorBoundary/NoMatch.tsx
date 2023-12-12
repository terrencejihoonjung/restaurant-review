import Fallback from "../../assets/fallback.jpg";
import { Link } from "react-router-dom";
import { User } from "../../context/UsersContext";

type NoMatchProps = {
  user: User;
};

function NoMatch({ user }: NoMatchProps) {
  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center z-100">
      <img
        src={Fallback}
        alt="Background"
        className="absolute w-full h-full object-cover"
      />
      <span className="space-y-2 flex flex-col justify-center items-center font-inter text-white rounded-full relative">
        <p className="text-2xl">404 Not Found</p>
        <Link
          to={user.id ? "/restaurants" : "/users"}
          className="text-md btn px-4 py-2 hover:bg-black hover:text-white hover:border-none"
        >
          Reload Page
        </Link>
      </span>
    </div>
  );
}

export default NoMatch;
