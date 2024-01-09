import React, { useEffect, useState } from "react";
import "../style/AddToDoListPage.css";
import Categories from "../layouts/components/Categories";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddToDoListPage = () => {
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
      const formattedDate = new Date(response.data.date).toISOString().split('T')[0];
      setDate(formattedDate);
      setTime(response.data.time);
      setCategories(response.data.categories);
    });
  }, [id]);

  const saveToDo = async (e) => {
    e.preventDefault();
    const toDoData = {
      title,
      description,
      date,
      time,
      categories,      
    };

    if (id) {
      await axios.put("/ToDoList", {
        id,
        ...toDoData,
      });
      alert("ToDo task updated successfully!");
      navigate(-1);
    } else {
      await axios.post("/ToDoList", toDoData);
      alert("ToDo task added successfully!");
      navigate("/ToDoList/Dashboard");
    }
  };

  const navigateBack = () => {
    navigate(-1); // Redirects back to the previous page in history
  };

  return (
    <div>
      <div className="display-header">
      <h1>Add New ToDo</h1>
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
      
      <form action="" className="todo-form" onSubmit={saveToDo}>
        <label htmlFor="" className="todo-label">
          Title:
          <input
            type="text"
            placeholder="Title of the ToDo task"
            className="todo-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="" className="todo-label">
          Description: <br />
          <textarea
            className="todo-text-area"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label htmlFor="" className="todo-label">
          Date:
          <input
            type="date"
            placeholder="date"
            className="todo-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label htmlFor="" className="todo-label">
          Time:
          <input
            type="time"
            placeholder="time"
            className="todo-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <label htmlFor="" className="todo-label">
          Categories:
        </label>

        <div className="categories">
          <Categories selected={categories} onChange={setCategories} />
        </div>
        <button className="save-button">Save</button>
      </form>
    </div>
  );
};

export default AddToDoListPage;
