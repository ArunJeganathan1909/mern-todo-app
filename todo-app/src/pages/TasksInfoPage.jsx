import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/TaskInfoPage.css";

const TasksInfoPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/tasks/${id}`).then((response) => {
      setTitle(response.data.title);
      setDescription(response.data.description);
      const formattedDate = new Date(response.data.date)
        .toISOString()
        .split("T")[0];
      setDate(formattedDate);
      setTime(response.data.time);
      setCategories(response.data.categories);
    });
  }, [id]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const navigateBack = () => {
    navigate(-1); // Redirects back to the previous page in history
  };

  return (
    <div className="tasks-info">
      <div className="task-header">
        <h1 className="task-heading1">{title}</h1>
        <Link to={`/ToDoList/${id}`} className="task-button">
          <button>
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </Link>

        <button className="task-button" onClick={navigateBack}>
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

      <div>
        <div className="tasks">
          <h2 className="task-heading2">Description: </h2>
          <span className="tasks-text">{description}</span>
        </div>
        <div className="tasks">
          <h2 className="task-heading2">Date: </h2>
          <span className="tasks-text">{date}</span>
        </div>
        <div className="tasks">
          <h2 className="task-heading2">Time: </h2>
          <span className="tasks-text">{time ? time : "No time added"}</span>
        </div>
        <div className="tasks">
          <h2 className="task-heading2">Categories:</h2>
          <div className="tasks-category">
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                {capitalizeFirstLetter(category)}
                {index !== categories.length - 1 && <br />}{" "}
                {/* Add line break except for the last category */}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksInfoPage;
