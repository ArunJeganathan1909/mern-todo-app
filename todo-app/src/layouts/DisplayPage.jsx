import React from "react";
import { Routes, Route } from "react-router-dom";
import AddToDoListPage from "../pages/AddToDoListPage";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import OnThisDay from "./components/OnThisDay";
import Important from "./components/Important";
import Planned from "./components/Planned";
import CategoryPage from "./components/CategoryPage";
import Profile from "../pages/Profile";
import TasksInfoPage from "../pages/TasksInfoPage";

const DisplayPage = () => {
  return (
    <div>
      <div className="display-contant">
        <Routes>
          <Route path="/AddToDo" Component={AddToDoListPage} />
          <Route path="/:id" Component={AddToDoListPage} /> 
          <Route path="/Dashboard" Component={Dashboard} />
          <Route path="/Tasks" Component={Tasks} />
          <Route path="/Tasks/:id" Component={TasksInfoPage} />
          <Route path="/OnThisDay" Component={OnThisDay} /> 
          <Route path="/Important" Component={Important} /> 
          <Route path="/Planned" Component={Planned} />
          <Route path="/category/Events" element={<CategoryPage categoryName="Events" />} />
          <Route path="/category/BirthDay" element={<CategoryPage categoryName="BirthDay" />} />
          <Route path="/category/Work" element={<CategoryPage categoryName="Work" />} />
          <Route path="/category/Home" element={<CategoryPage categoryName="Home" />} />
          <Route path="/category/Groceries" element={<CategoryPage categoryName="Groceries" />} />
          <Route path="/category/Movies" element={<CategoryPage categoryName="Movies" />} />
          <Route path="/category/Plane-To-GO" element={<CategoryPage categoryName="Plane-To-GO" />} />
          <Route path="/category/Others" element={<CategoryPage categoryName="Others" />} />
          <Route path="/Profile" Component={Profile} /> 
        </Routes>
      </div>
    </div>
  );
};

export default DisplayPage;
