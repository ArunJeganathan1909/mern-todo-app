import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/LoginPage.css";
import IndexHeader from "../layouts/components/IndexHeader";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/register", {
        name,
        email,
        mobile,
        password,
      });
      alert("Register Successfully. Now you can login.");
      navigate("/");
    } catch (error) {
      alert("Registration failed. Please try again later");
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleNameChange = (e) => {
    const enteredName = e.target.value;
    setName(capitalizeFirstLetter(enteredName));
  };

  return (
    <div>
      <div>
        <IndexHeader />
      </div>
      <div className="page-container">
        <div className="form-container">
          <h1 className="form-heading">Register</h1>
          <form className="form" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Enter your name. eg: Arun"
              value={name}
              onChange={handleNameChange}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="e.g: +94 07xxxxxxxx"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Register</button>
            <div className="account-text">
              Already a member?
              <br />
              <Link to={"/"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
