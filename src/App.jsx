import "./i18n.js";
import React from "react";
import Router from "./Router.jsx";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./store/store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router />
  </Provider>
);
