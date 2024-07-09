import Request from "../../helpers/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// Запрос на популярные фильмы
export const getFilmsPopular = createAsyncThunk(
  "homeRequest/getFilmsPopular",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `movie/popular?language=${data.language}&page=${data.page}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.responses.data);
    }
  }
);

// Запрос на популярные сериалы
export const getPopularSerial = createAsyncThunk(
  "homeRequestSerial/getPopularSerial",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `tv/popular?language=${data.language}&page=${data.page}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.responses.data);
    }
  }
);

// Поиск
export const getSearch = createAsyncThunk(
  "searchCinema/getSearch",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `search/multi?include_adult=false&language=${data.language}&page=${data.page}&query=${data.query}`
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
    search: [],
    searchError: null,
    resultsSerial: undefined,
    serialError: undefined,
    popularError: undefined,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilmsPopular.fulfilled, (state, { payload }) => {
        state.results = payload.results;
        state.loading = false;
      })
      .addCase(getFilmsPopular.rejected, (state, { payload }) => {
        state.popularError = payload;
      })
      .addCase(getPopularSerial.fulfilled, (state, { payload }) => {
        state.resultsSerial = payload.results;
        state.loading = false;
      })
      .addCase(getPopularSerial.rejected, (state, { payload }) => {
        state.serialError = payload;
      })
      .addCase(getSearch.fulfilled, (state, { payload }) => {
        state.search = payload;
        state.loading = false;
      })
      .addCase(getSearch.rejected, (state, { payload }) => {
        state.loading = payload;
      });
  },
});
export const { setLoading } = homeSlice.actions;
export default homeSlice.reducer;
