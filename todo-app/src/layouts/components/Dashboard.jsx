import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../style/components/Dashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    axios
      .get("/tasks")
      .then((response) => {
        const tasks = response.data;
        const marked = tasks.map((task) => new Date(task.date));
        setMarkedDates(marked);
        setAllTasks(tasks);

        // Filter tasks for today's date initially
        const today = new Date();
        const todayTasks = tasks.filter((task) => {
          const taskDate = new Date(task.date);
          return (
            taskDate.getFullYear() === today.getFullYear() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getDate() === today.getDate()
          );
        });
        setSelectedTasks(todayTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const onChange = (newDate) => {
    setDate(newDate);
    updateTasksForDate(newDate);
  };

  const updateTasksForDate = (newDate) => {
    const clickedDate = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate()
    );

    const tasksOnSelectedDate = allTasks.filter((task) => {
      const taskDate = new Date(task.date);
      return (
        taskDate.getFullYear() === clickedDate.getFullYear() &&
        taskDate.getMonth() === clickedDate.getMonth() &&
        taskDate.getDate() === clickedDate.getDate()
      );
    });
    setSelectedTasks(tasksOnSelectedDate);
  };

  const handleDateClick = (clickedDate) => {
    setDate(clickedDate);
    updateTasksForDate(clickedDate);
  };

  return (
    <div>
      <h2>DashBoard</h2>
      <div className="calendar">
        <Calendar
          onChange={onChange}
          value={date}
          tileClassName={({ date }) => {
            return markedDates.some(
              (markedDate) =>
                date.getFullYear() === markedDate.getFullYear() &&
                date.getMonth() === markedDate.getMonth() &&
                date.getDate() === markedDate.getDate()
            )
              ? "marked-date"
              : null;
          }}
          onClickDay={(clickedDate) => handleDateClick(clickedDate)}
        />
      </div>
      <div className="tasks-list">
        <h2>Tasks on {date.toDateString()}</h2>
        {selectedTasks.length === 0 ? (
          <h3>No tasks added yet</h3>
        ) : (
          selectedTasks.map((task) => (
            <Link
              key={task._id}
              className="task-item"
              to={`/ToDoList/Tasks/${task._id}`}
            >
              <div className="content">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
