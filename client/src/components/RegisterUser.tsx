import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../context/UsersContext";
import validateRegisterInput from "../helpers/validateRegisterInput";

type RegisterProps = {
  setToastToggle: (toastToggle: boolean) => void;
};

function RegisterUser({ setToastToggle }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useUsersContext();

  async function handleRegister() {
    try {
      validateRegisterInput(username, email, password);

      const body = { username, email, password };
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();

      if (response.ok) {
        setUser(jsonData.user);
        navigate("/restaurants");
        setToastToggle(true);
        setTimeout(() => {
          // After 3 seconds set the show value to false
          setToastToggle(false);
        }, 3000);
      } else {
        throw new Error(jsonData.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  return (
    <>
      <div className="card w-1/4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Create an Account</h2>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {error ? (
            <div className="alert alert-warning mb-4 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          ) : null}
          <div className="card-actions justify-start mt-2">
            <button onClick={() => handleRegister()} className="btn">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterUser;
