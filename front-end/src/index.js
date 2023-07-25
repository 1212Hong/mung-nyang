import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router/Router";
import App from "./App";
import "./css/index.css";
import "./assets/fonts/font.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Router />
        <App />
    </>,
);
