import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./userContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "modern-normalize";
import App from "./components/App/App";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
