import { useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  username: string;
  email: string;
};

type UserProps = {
  setUser: (user: User) => void;
};

function LoginUser({ setUser }: UserProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      setUser(jsonData.user);
      navigate("/restaurants");
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      } else {
        console.error(err);
      }
    }
  }

  return (
    <>
      <div className="card w-1/4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>

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
          <div className="card-actions justify-start mt-2">
            <button onClick={() => handleLogin()} className="btn">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
