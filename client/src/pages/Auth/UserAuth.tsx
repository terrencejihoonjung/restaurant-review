import RegisterUser from "../Register/RegisterUser";
import LoginUser from "../Login/LoginUser";
import { useState } from "react";

type UserProps = {
  setToastToggle: (toastToggle: boolean) => void;
};

function User({ setToastToggle }: UserProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="min-h-screen min-w-screen flex flex-col justify-center items-center space-y-4 bg-gradient-to-r from-fuchsia-500 to-yelp-red">
        {toggle ? (
          <RegisterUser setToastToggle={setToastToggle} />
        ) : (
          <LoginUser setToastToggle={setToastToggle} />
        )}
        <button
          className="btn btn-outline btn-wide"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? "Have an account? Login" : "Create an Account"}
        </button>
      </div>
    </>
  );
}

export default User;
