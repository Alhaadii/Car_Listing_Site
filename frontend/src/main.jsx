import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" autoClose={1000} />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
