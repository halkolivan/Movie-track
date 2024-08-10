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
      window.scrollTo({ top: 0, behavior: "auto" });
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
      window.scrollTo({ top: 0, behavior: "auto" });
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
      window.scrollTo({ top: 0, behavior: "auto" });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);

//Топ фильмы
export const getTopFilms = createAsyncThunk(
  "homeRequestTop/getTopFilms",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `movie/top_rated?language=${data.language}&page=${data.page}`
      );
      
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.responses.data);
    }
  }
);

//Топ Сериалы
export const getTopSerials = createAsyncThunk(
  "homeRequestTopSerials/getTopSerials",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `tv/top_rated?language=${data.language}&page=${data.page}`
      );
      
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.responses.data);
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
    resultsTopF: undefined,
    resultsTopS: undefined,
    topError: undefined,
    topSerialError: undefined,
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
        state.searchError = payload;
      })
      .addCase(getTopFilms.fulfilled, (state, { payload }) => {
        state.resultsTopF = payload;
        state.loading = false;
      })
      .addCase(getTopFilms.rejected, (state, { payload }) => {
        state.topError = payload;
      })
      .addCase(getTopSerials.fulfilled, (state, { payload }) => {
        state.resultsTopS = payload;
        state.loading = false;
      })
      .addCase(getTopSerials.rejected, (state, { payload }) => {
        state.topSerialError = payload;
      });
  },
});
export const { setLoading } = homeSlice.actions;
export default homeSlice.reducer;
