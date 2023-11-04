import RegisterUser from "../components/RegisterUser";
import LoginUser from "../components/LoginUser";
import { useState } from "react";

type UserProps = {
  setToastToggle: (toastToggle: boolean) => void;
};

function User({ setToastToggle }: UserProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center pt-12">
        {toggle ? (
          <RegisterUser setToastToggle={setToastToggle} />
        ) : (
          <LoginUser setToastToggle={setToastToggle} />
        )}
        <button
          className="btn btn-wide mt-4"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? "Have an account? Login" : "Create an Account"}
        </button>
      </div>
    </>
  );
}

export default User;
