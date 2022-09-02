import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DashboardProvider } from "./context/DashboardContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DashboardProvider>
      <Router>
        <App />
      </Router>
    </DashboardProvider>
  </React.StrictMode>
);
