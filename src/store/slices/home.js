import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getFilmsPopular = createAsyncThunk(
  "homeRequest/getFilmsPopular",
  async (_,{ rejectedWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1`
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    loading: true,
    results: undefined,
    popularError: undefined,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFilmsPopular.fulfilled, (state, { payload }) => {
      state.results = payload.results;
      state.loading = false;
    });
    builder.addCase(getFilmsPopular.rejected, (state, { payload }) => {
      state.popularError = payload;
    });
  },
});
export const { setLoading } = homeSlice.actions;
export default homeSlice.reducer;
