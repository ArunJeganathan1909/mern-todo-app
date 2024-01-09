import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/components/Tasks.css";

const Important = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/tasks")
      .then((response) => {
        const sortedTodos = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setTodos(sortedTodos);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const importantTasks = todos.filter((todo) => todo.important);

  const navigateBack = () => {
    navigate("/ToDoList/Dashboard"); // Redirects back to the previous page in history
  };

  return (
    <div className="display">
      <div className="display-header">
        <h2>My Important Tasks </h2>
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
      {importantTasks.length === 0 ? (
        <h2>No important tasks added yet</h2>
      ) : (
        importantTasks.map((todo, index) => (
          <div key={todo._id} className="display-task">
            <div className="date">
              {index === 0 ||
              new Date(todo.date).toDateString() !==
                new Date(importantTasks[index - 1].date).toDateString() ? (
                <h3 className="date-text">
                  Date: {new Date(todo.date).toDateString()}
                </h3>
              ) : null}
            </div>
            <div className="task-label">
              <Link key={todo._id} to={`/tasks/${todo._id}`} className="task">
                <div className="content">
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </div>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Important;
