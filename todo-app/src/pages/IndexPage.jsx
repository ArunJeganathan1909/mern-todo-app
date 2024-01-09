import React from "react";
import IndexHeader from "../layouts/components/IndexHeader";
import { Link } from "react-router-dom";
import Login from "../assets/login.png";
import Register from "../assets/register.png";
import AddnewToDo from "../assets/AddnewToDo.png";
import Dashboard from "../assets/dashboard.png";
import Tasks from "../assets/tasks.png";
import Category from "../assets/category.png";
import Profile from "../assets/profile.png";
import Computer from '../assets/Computer.png'
import "../style/IndexPage.css";

const IndexPage = () => {
  return (
    <div>
      <div>
        <IndexHeader />
      </div>
      <div className="index">
        <div className="getStart">
          <img src={Computer} alt="Computer" className="getStart-image"/>
          <Link to={"/Login"}>
            <button className="getStart-button">Get Start</button>
          </Link>
        </div>
        <h2>About AR ToDo App</h2>
      </div>
      <div className="about-page">
        <div className="about-widget-left">
          <div className="image-contain">
            <img src={Login} alt="Login" className="images" />
            <img src={Register} alt="Register" className="images" />
          </div>
          <div className="text-contain">
            <p>
              This page is designed to offer a seamless and straightforward
              experience for logging in and registering. Our login and register
              page aims to simplify the process, ensuring ease of access for our
              users.
            </p>
          </div>
        </div>

        <div className="about-widget-right">
          <div className="text-contain">
            <p>
              Adding a new todo is just a click away with our streamlined
              interface. Simply tap the "Add New Todo" button, and effortlessly
              include your tasks without any hassle. Our platform boasts a sleek
              dashboard featuring an interactive calendar. By selecting a date,
              you gain access to a comprehensive overview of your todos
              scheduled for that specific day. Dive into the details
              effortlessly, making planning and organizing your tasks a breeze.
              We've crafted this dashboard with user convenience in mind,
              ensuring that managing your todos becomes an intuitive and
              efficient process.
            </p>
          </div>
          <div className="image-contain">
            <img src={Dashboard} alt="Dashboard" className="images" />
            <img src={AddnewToDo} alt="AddnewToDo" className="images" />
          </div>
        </div>

        <div className="about-widget-left">
          <div className="image-contain">
            <img src={Tasks} alt="Tasks" className="images" />
            <div className="image-contain-coloumn">
              <img src={Category} alt="Category" className="images" />
              <img src={Profile} alt="Profile" className="images" />
            </div>
          </div>
          <div className="text-contain">
            <p>
              In our tasks page, flexibility is key. Not only can you easily
              add, edit, and delete tasks, but you can also prioritize them by
              marking as important. Seamlessly manage your profile on the
              dedicated profile page, where you can personalize and fine-tune
              your preferences. The sidebar introduces a game-changing feature:
              categories. This function allows you to categorize and organize
              your tasks efficiently. Simply sort and manage tasks based on
              their categories, optimizing your workflow and ensuring a more
              structured approach to your to-dos. Our goal is to empower you
              with the tools to tailor your task management experience to suit
              your unique needs and preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
