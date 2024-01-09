import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import "../style/ToDoListPage.css";
import Slidebar from "../layouts/Slidebar";
import ArToDoLogo from "../assets/ArToDo.svg";

import DisplayPage from "../layouts/DisplayPage";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ToDoListPage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const loggedInUser = user ? user : { name: "", email: "" };

  const navigate = useNavigate();

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
    alert("Logout successful");
    navigate("/");
  };

  return (
    <div className="todopage-container">
      <div className="todopage-header">
        <div className="title">
          <img src={ArToDoLogo} alt="ArToDoLogo"  className="logo"/>
          
          <h1 className="list-heading">AR TODO APP</h1>{" "}
          {/* Remove one of these lines */}
        </div>
        <div className="profile-header">
          <h3 className="list-heading-2">Logged in as {loggedInUser.name}</h3>
          <div className="profile">
            <Link to={"Profile"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="profile-icon"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{loggedInUser.name}</span>
            </Link>
            <button className="logout-button" onClick={logout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="profile-icon"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="display-container">
        <div className="todo-sidebar">
          <Slidebar />
        </div>
        <div className="todo-display">
          <DisplayPage />
        </div>
      </div>
    </div>
  );
};

export default ToDoListPage;
