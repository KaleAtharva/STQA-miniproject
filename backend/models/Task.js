// backend/models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    status: { type: String, default: "Not Completed" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Creator of the task
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assignee
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
