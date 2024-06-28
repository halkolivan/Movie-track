import Request from "../../helpers/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDetailFilm = createAsyncThunk(
  "detailFilmRequest/getDetailFilm",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `movie/${data.id}?language=${data.language}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);
export const getDetailSerial = createAsyncThunk(
  "detailSerialmRequest/getDetailSerial",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `tv/${data.id}?language=${data.language}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);

// Запрос на трейлер фильма
export const getTrailersDetail = createAsyncThunk(
  "requestTrailersDetail/getTrailersDetail",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `movie/${data.id}/videos?language=${data.language}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);
// Запрос на трейлер сериала
export const getTrailersDetailSerial = createAsyncThunk(
  "requestTrailersDetailSerial/getTrailersDetailSerial",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `tv/${data.id}/videos?language=${data.language}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);
// Запрос актёров фильма
export const getCreditsPerson = createAsyncThunk(
  "requestCreditsPerson/getCreditsPerson",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `movie/${data.id}/credits?language=${data.language}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);
// Запрос актёров сериала
export const getCreditsPersonSerial = createAsyncThunk(
  "requestCreditsPersonSerial/getCreditsPersonSerial",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `tv/${data.id}/credits?language=${data.language}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);
//Похожие кинокартины (фильмы)
export const getRecommendatFilm = createAsyncThunk(
  "recommendatFilmRequest/getRecommendatFilm",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `movie/${data.id}/recommendations?language=${data.language}&page=${data.page}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);
//Похожие кинокартины (сериалы)
export const getRecommendatSerial = createAsyncThunk(
  "recommendatSerialRequest/getRecommendatSerial",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `tv/${data.id}/recommendations?language=${data.language}&page=${data.page}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);

const detailFilmsSlice = createSlice({
  name: "detailMovie",
  initialState: {
    resultsDfilm: undefined,
    resultsDserial: undefined,
    results: undefined,
    resultsTrailerSerial: undefined,
    actors: undefined,
    actorsSerial: undefined,
    recommendat: undefined,
    recommendatSerial: undefined,
    recommendatError: undefined,
    recommendatSerialError: undefined,
    personError: undefined,
    personSerialError: undefined,
    detailFilmError: undefined,
    detailSerialError: undefined,
    trailersDetailError: undefined,
    trailersDetailSerialError: undefined,
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
      })
      .addCase(getDetailSerial.fulfilled, (state, { payload }) => {
        state.resultsDserial = payload;
        state.loading = false;
      })
      .addCase(getDetailSerial.rejected, (state, { payload }) => {
        state.detailSerialError = payload;
      })
      .addCase(getTrailersDetail.fulfilled, (state, { payload }) => {
        state.results = payload.results;
        state.loading = false;
      })
      .addCase(getTrailersDetail.rejected, (state, { payload }) => {
        state.trailersDetailError = payload;
      })
      .addCase(getTrailersDetailSerial.fulfilled, (state, { payload }) => {
        state.resultsTrailerSerial = payload.results;
        state.loading = false;
      })
      .addCase(getTrailersDetailSerial.rejected, (state, { payload }) => {
        state.trailersDetailSerialError = payload;
      })
      .addCase(getCreditsPerson.fulfilled, (state, { payload }) => {
        state.actors = payload;
        state.loading = false;
      })
      .addCase(getCreditsPerson.rejected, (state, { payload }) => {
        state.personError = payload;
      })
      .addCase(getCreditsPersonSerial.fulfilled, (state, { payload }) => {
        state.actorsSerial = payload.cast;
        state.loading = false;
      })
      .addCase(getCreditsPersonSerial.rejected, (state, { payload }) => {
        state.personSerialError = payload;
      })
      .addCase(getRecommendatFilm.fulfilled, (state, { payload }) => {
        state.recommendat = payload;
        state.loading = false;
      })
      .addCase(getRecommendatFilm.rejected, (state, { payload }) => {
        state.recommendatError = payload;
      })
      .addCase(getRecommendatSerial.fulfilled, (state, { payload }) => {
        state.recommendatSerial = payload;
        state.loading = false;
      })
      .addCase(getRecommendatSerial.rejected, (state, { payload }) => {
        state.recommendatSerialError = payload;
      });
  },
});

export const { setloading } = detailFilmsSlice.actions;

export default detailFilmsSlice.reducer;
