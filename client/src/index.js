import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GOOGLE_CLIENT_ID } from "./Constant";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <App />
      </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
