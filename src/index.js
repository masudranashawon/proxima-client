import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ProjectContextProvider } from "./context/ProjectContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ProjectContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
