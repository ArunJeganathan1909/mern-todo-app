import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/components/Tasks.css";

const OnThisDay = () => {
  const [todos, setTodos] = useState([]);
  const today = new Date().toDateString();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/tasks")
      .then((response) => {
        const filteredTodayTasks = response.data.filter(
          (todo) => new Date(todo.date).toDateString() === today
        );
        setTodos(filteredTodayTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [today]);

  const navigateBack = () => {
    navigate("/ToDoList/Dashboard"); // Redirects back to the previous page in history
  };

  return (
    <div className="display">
      <div className="display-header">
        <h2> On This Day </h2>
        <button className="navigate-button" onClick={navigateBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="edit-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </div>
      {todos.length === 0 ? (
        <h2>No tasks added for today</h2>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="display-task">
            <Link key={todo._id} to={"/tasks/" + todo._id} className="task">
              <div className="content">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default OnThisDay;
