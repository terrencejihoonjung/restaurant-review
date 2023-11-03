import RegisterUser from "../components/RegisterUser";
import LoginUser from "../components/LoginUser";
import { useState } from "react";

function User() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center pt-12">
        {toggle ? <RegisterUser /> : <LoginUser />}
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
