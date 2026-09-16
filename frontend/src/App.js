import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import AddProject from "./pages/AddProject";

function PlaceholderPage({ title }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07090d",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "Arial, Helvetica, sans-serif",
        fontSize: "24px",
        fontWeight: 700,
      }}
    >
      {title} — Coming Soon
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* Projects */}
        <Route
          path="/projects"
          element={<Projects />}
        />

        {/* Project Details */}
        <Route
          path="/projects/:id"
          element={<ProjectDetails />}
        />

        {/* Add Project */}
        <Route
          path="/projects/add"
          element={<AddProject />}
        />

        {/* Future Pages */}
        <Route
          path="/skills"
          element={
            <PlaceholderPage title="Skills" />
          }
        />

        <Route
          path="/experience"
          element={
            <PlaceholderPage title="Experience" />
          }
        />

        <Route
          path="/activity"
          element={
            <PlaceholderPage title="Activity" />
          }
        />

        <Route
          path="/documents"
          element={
            <PlaceholderPage title="Documents" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;