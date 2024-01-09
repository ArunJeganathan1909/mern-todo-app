const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("./models/User");
const ToDo = require("./models/ToDo");

const app = express();
const PORT = 5000;
const bcryptSalt = 10;
const JwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
app.post("/register", async (request, response) => {
  const { name, email, mobile, password } = request.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      mobile,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    response.json(userDoc);
  } catch (error) {
    response.status(422).json(error);
  }
});

app.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        JwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          response.cookie("token", token).json(userDoc);
        }
      );
    } else {
      response.status(422).json("Password not ok");
    }
  } else {
    response.json("notfound");
  }
});

app.post('/logout', (request, response) => {
  response.cookie('token', '').json(true)
})

app.get("/account", (request, response) => {
  const { token } = request.cookies;

  if (token) {
    jwt.verify(token, JwtSecret, {}, async (error, userData) => {
      if (error) {
        response.status(401).json({ error: "Token is invalid or expired" });
      } else {
        try {
          const { name, email, mobile, id } = await User.findById(userData.id);
          response.json({ name, email, mobile, id });
        } catch (error) {
          response.status(500).json({ error: "Error fetching user data" });
        }
      }
    });
  } else {
    response.status(401).json({ error: "Token not found" });
  }
});

app.post("/ToDoList", (request, response) => {
  const { token } = request.cookies;
  const { title, description, date, time, categories, important } =
    request.body;
  jwt.verify(token, JwtSecret, {}, async (error, userData) => {
    if (error) throw error;

    const toDoDoc = await ToDo.create({
      user: userData.id,
      title,
      description,
      date,
      time,
      categories,
      important,
    });
    response.json(toDoDoc);
  });
});

app.get("/tasks", async (request, response) => {
  try {
    const { token } = request.cookies;
    const decoded = jwt.verify(token, JwtSecret);
    const userId = decoded.id;

    const tasks = await ToDo.find({ user: userId });
    response.json(tasks);
  } catch (error) {
    response.status(500).json({ error: "Unable to fetch tasks" });
  }
});

app.get('/tasks/:id', async (request, response) => {
  const {id} = request.params
  response.json(await ToDo.findById(id))
})

app.put("/ToDoList", async (request, response) => {
  try {
    const { token } = request.cookies;
    const { id, title, description, date, time, categories, important } =
      request.body;

    const decoded = jwt.verify(token, JwtSecret);
    const userId = decoded.id;

    const toDoDoc = await ToDo.findById(id);

    if (!toDoDoc) {
      return response.status(404).json({ error: "Task not found" });
    }

    if (userId !== toDoDoc.user.toString()) {
      return response.status(403).json({ error: "Unauthorized action" });
    }

    toDoDoc.set({
      title,
      description,
      date,
      time,
      categories,
      important,
    });

    await toDoDoc.save();
    response.json("ok");
  } catch (error) {
    console.error("Error updating task:", error);
    response.status(500).json({ error: "Server error" });
  }
});

app.put("/ToDoListImportant", async (request, response) => {
  try {
    const { token } = request.cookies;
    const { id, important } = request.body;

    const decoded = jwt.verify(token, JwtSecret);
    const userId = decoded.id;

    const toDoDoc = await ToDo.findById(id);

    if (!toDoDoc) {
      return response.status(404).json({ error: "Task not found" });
    }

    if (userId !== toDoDoc.user.toString()) {
      return response.status(403).json({ error: "Unauthorized action" });
    }

    toDoDoc.important = important;

    await toDoDoc.save();
    response.json({
      message: "ToDo item updated successfully",
      updatedToDo: toDoDoc,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    response.status(500).json({ error: "Server error" });
  }
});

app.delete("/tasks/:id", async (request, response) => {
  try {
    const { token } = request.cookies;
    const { id } = request.params;

    const decoded = jwt.verify(token, JwtSecret);
    const userId = decoded.id;

    const toDoDoc = await ToDo.findById(id);

    if (!toDoDoc) {
      return response.status(404).json({ error: "Task not found" });
    }

    if (userId !== toDoDoc.user.toString()) {
      return response.status(403).json({ error: "Unauthorized action" });
    }

    await ToDo.findByIdAndDelete(id);
    response.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    response.status(500).json({ error: "Server error" });
  }
});


app.listen(PORT, () => {
  console.log(`App is running on poort: ${PORT}`);
  deletePastTasks();
});

async function deletePastTasks() {
  try {
    const currentDate = new Date();
    const tasks = await ToDo.find();

    for (const task of tasks) {
      const taskDate = new Date(task.date);
      const diffInDays = Math.floor((currentDate - taskDate) / (1000 * 60 * 60 * 24));

      if (diffInDays > 2) {
        await ToDo.findByIdAndDelete(task._id);
        console.log(`Task ID ${task._id} deleted as its date has passed by more than 2 days.`);
      }
    }
  } catch (error) {
    console.error("Error deleting past tasks:", error);
  }
}

