import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router/Router";
import App from "./App";
import "./assets/fonts/font.css";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>

        <Router />
    </React.StrictMode>,
);
