import { configureStore } from "@reduxjs/toolkit";

import Home from "../store/slices/home";
import DetailsCinema from "../store/slices/detailsCinema";

export const store = configureStore({
  reducer: {
    home: Home,
    detailFilm: DetailsCinema,
  },
});
