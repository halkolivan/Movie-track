import { configureStore } from "@reduxjs/toolkit";

import Home from "../store/slices/home";
import DetailsCinema from "../store/slices/detailsCinema";
import DetailsPerson from "../store/slices/detailsPerson";

export const store = configureStore({
  reducer: {
    home: Home,
    detailMovie: DetailsCinema,
    detailsPerson: DetailsPerson,
  },
});
