import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/components/Tasks.css";

const Tasks = () => {
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

  const handleImportantClick = async (id) => {
    try {
      const updatedTodos = todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, important: !todo.important }; // Toggle the 'important' status
        }
        return todo;
      });

      setTodos(updatedTodos);

      const todoToUpdate = todos.find((todo) => todo._id === id);
      await axios.put(`/ToDoListImportant`, {
        id: id,
        important: !todoToUpdate.important,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      const updatedTasks = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const navigateBack = () => {
    navigate("/ToDoList/Dashboard"); // Redirects back to the previous page in history
  };

  return (
    <div className="display">
      <div className="display-header">
        <h2> My Tasks </h2>
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
        <h2>No tasks added yet</h2>
      ) : (
        todos.map((todo, index) => (
          <div key={todo._id} className="display-task">
            <div className="date">
              {index === 0 ||
              new Date(todo.date).toDateString() !==
                new Date(todos[index - 1].date).toDateString() ? (
                <h3 className="date-text">
                  Date: {new Date(todo.date).toDateString()}
                </h3>
              ) : null}
            </div>
            <div className="task-label">
              <Link
                key={todo._id}
                to={`/ToDoList/Tasks/${todo._id}`}
                className="task"
              >
                <div className="content">
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </div>
              </Link>
              <Link to={"/ToDoList/" + todo._id} className="edit-button">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="content-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </Link>
              <button
                className="star-button"
                onClick={() => handleImportantClick(todo._id)}
              >
                {todo.important ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="content-icon-fill"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="content-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )}
              </button>
              <button 
              className="delete-button"
              onClick={() => handleDeleteClick(todo._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="delete-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Tasks;
