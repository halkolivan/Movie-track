import { configureStore } from "@reduxjs/toolkit";

import Home from "../store/slices/home"

export const store = configureStore({
    reducer: {
      home:Home
    }
})