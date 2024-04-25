import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "modern-normalize";
import App from "./components/App/App";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ScrollToTop /> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
