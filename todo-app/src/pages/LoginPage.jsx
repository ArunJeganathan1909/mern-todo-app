import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/LoginPage.css";
import axios from "axios";
import { UserContext } from "../UserContext";
import IndexHeader from "../layouts/components/IndexHeader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { ready, user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/login", { email, password }).then((response) => {
        console.log(response);
        setUser(response.data);
        alert("Login successful");
        navigate("/ToDoList/Dashboard");
      });
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <div>
        <IndexHeader />
      </div>
      <div className="page-container">
        <div className="form-container">
          <h1 className="form-heading">Login</h1>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <button>Login</button>
            <div className="account-text">
              Don't Have An Account Yet?
              <br />
              <Link to={"/Register"} className="">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
