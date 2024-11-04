import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./TaskManager.css";

function TaskManager({ user }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const [showTask, setShowTask] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchUsers();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await API.get(`/tasks/${user._id}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/tasks", {
        title,
        description,
        dueDate,
        userId: user._id,
        assignedTo,
      });
      setTasks([...tasks, response.data.task]);
      setTitle("");
      setDescription("");
      setDueDate("");
      setAssignedTo("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const task = () => {
    setShowTask(!showTask);
  };

  const taskAdded = () => {
    setAdded(true);
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div id="dashboard" className="task-manager">
      <h2>Task Manager</h2>
      <form onSubmit={addTask}>
        <input
          type="text"
          id="taskTitle"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          id="taskDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="date"
          id="taskDueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          id="assign"
        >
          <option value="">Assign To</option>
          {users.map((user) => (
            <option key={user._id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <button
          id="createTaskButton"
          type="submit"
          onClick={() => {
            taskAdded();
          }}
        >
          Add Task
        </button>
      </form>
      {added && <div id="successMessage">Task Created successfully</div>}
      <h3>Your Tasks</h3>
      <button
        onClick={() => {
          task();
        }}
        id="task-hide"
      >
        {showTask ? "Hide Tasks" : "Show Tasks"}
      </button>
      <ul>
        {showTask &&
          tasks.map((task) => (
            <li key={task._id}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>
                Assigned To:
                {task.assignedTo ? task.assignedTo.username : "None"}
              </p>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TaskManager;
