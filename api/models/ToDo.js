const mongoose = require("mongoose");
const { Schema } = mongoose;

const ToDoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  categories: {
    type: [String],
  },
  important : {
    type: Boolean,
    default: false,
  }
});

const ToDoModel = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDoModel;
