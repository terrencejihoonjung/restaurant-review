import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../context/UsersContext";

function RegisterUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useUsersContext();

  async function handleRegister() {
    try {
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
      console.log(jsonData);
      if (response.ok) {
        setUser(jsonData.user);
        navigate("/restaurants");
      } else {
        throw new Error(jsonData.message);
      }
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
