import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.jsx";
import "./i18n.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router />
  </Provider>
);
