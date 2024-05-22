import Request from "../../helpers/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDetailFilm = createAsyncThunk(
  "detailFilmRequest/getDetailFilm",
  async (data, { id }, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `movie/${id}?language=${data.language}`
      );
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);

const initialState = {
  resultsDfilm: {
    adult: false,
    backdrop_path: "",
    belongs_to_collection: null,
    budget: 0,
    genres: [],
    homepage: "",
    id: 0,
    imdb_id: "",
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    production_companies: [],
    production_countries: [],
    release_date: "",
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: "",
    tagline: "",
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  detailFilmError: undefined,
  loading: true,
};

const detailFilmsSlice = createSlice({
  name: "detailFilm",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailFilm.fulfilled, (state, { payload }) => {
        state.resultsDfilm = payload.initialState;
        state.loading = false;
      })
      .addCase(getDetailFilm.rejected, (state, { payload }) => {
        state.detailFilmError = payload;
      });
  },
});

export const { setloading } = detailFilmsSlice.actions;
export default detailFilmsSlice.reducer;
