// backend/routes/taskRoutes.js
const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Create a new task
router.post("/", async (req, res) => {
  const { title, description, dueDate, userId, assignedTo } = req.body;

  try {
    const task = new Task({ title, description, dueDate, userId, assignedTo });
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});

// Fetch tasks for a specific user (either created by or assigned to them)
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({
      $or: [{ userId }, { assignedTo: userId }],
    }).populate("assignedTo", "username"); // Populate assignedTo with username
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// Delete a task
router.delete("/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = router;
