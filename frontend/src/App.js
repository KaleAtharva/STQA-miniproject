import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./components/Auth";
import TaskManager from "./components/TaskManager";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Workload Management System</h1>

        <Routes>
          {/* Public Route: Login or Register */}
          <Route
            path="/login"
            element={
              !user ? (
                <Auth setUser={setUser} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          {/* Protected Route: Dashboard */}
          <Route
            path="/dashboard"
            element={
              user ? (
                <TaskManager user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Default Route: Redirect to login if not authenticated */}
          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
