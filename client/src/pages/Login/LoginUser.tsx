import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../../context/UsersContext";

type LoginProps = {
  setToastToggle: (toastToggle: boolean) => void;
};

function LoginUser({ setToastToggle }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUsersContext();

  async function handleLogin() {
    setLoading(true);
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        navigate("/restaurants");
        setToastToggle(true);
        setTimeout(() => {
          // After 3 seconds set the show value to false
          setToastToggle(false);
        }, 3000);
      } else {
        throw new Error("Login Failed");
      }
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  return (
    <>
      <div className="card w-1/4 bg-base-100 shadow-2xl">
        <div className="card-body space-y-2">
          <h2 className="card-title">Login</h2>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          {error ? (
            <div className="alert alert-warning w-full">
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
            <button onClick={() => handleLogin()} className="btn">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
