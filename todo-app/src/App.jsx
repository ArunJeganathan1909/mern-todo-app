import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css'
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ToDoList from "./pages/ToDoListPage.jsx";
import AddToDoListPage from "./pages/AddToDoListPage.jsx";
//import Sidebar from "./layouts/Sidebar.jsx";
import { UserContextProvider } from "./UserContext.jsx";
import axios from "axios";
import IndexPage from "./pages/IndexPage.jsx";

function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/ToDoList/*" element={<ToDoList />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
