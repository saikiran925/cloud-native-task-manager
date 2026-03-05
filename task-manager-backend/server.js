const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URL || "mongodb://mongodb:27017/taskmanager")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Task Schema
const taskSchema = new mongoose.Schema({
  name: String,
});

const Task = mongoose.model("Task", taskSchema);

// Get tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add task
app.post("/tasks", async (req, res) => {
  const task = new Task({ name: req.body.task });
  await task.save();
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});