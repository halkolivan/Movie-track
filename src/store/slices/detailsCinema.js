import Request from "../../helpers/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDetailFilm = createAsyncThunk(
  "detailFilmRequest/getDetailFilm",
  async (data, { id }, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `movie/movie_${id}?language=${data.language}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);

const detailFilmsSlice = createSlice({
  name: "detailFilm",
  initialState: {
    resultsDfilm: undefined,
    detailFilmError: undefined,
    loading: true,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailFilm.fulfilled, (state, { payload }) => {
        state.resultsDfilm = payload;
        state.loading = false;
      })
      .addCase(getDetailFilm.rejected, (state, { payload }) => {
        state.detailFilmError = payload;
      });
  },
});
console.log(getDetailFilm)
export const { setloading } = detailFilmsSlice.actions;
export default detailFilmsSlice.reducer;
