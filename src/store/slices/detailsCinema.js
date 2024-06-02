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

// Нулевой запрос (!)
export const getTrailersDetail = createAsyncThunk(
  "requestTrailersDetail/getTrailersDetail",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request.get(
        `movie/${data.id}/videos?language=${data.language}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);

export const getCreditsPerson = createAsyncThunk(
  "requestCreditsPerson/getCreditsPerson",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request.get(
        `movie/${data.id}/credits?language=${data.language}`
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
    resultsTr: undefined,
    resultsPerson: undefined,
    personError: undefined,
    detailFilmError: undefined,
    trailersDetailError: undefined,
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
      .addCase(getTrailersDetail.fulfilled, (state, { payload }) => {
        state.resultsTr = payload;
        state.loading = false;
      })
      .addCase(getTrailersDetail.rejected, (state, { payload }) => {
        state.trailersDetailError = payload;
      })
      .addCase(getCreditsPerson.fulfilled, (state, { payload }) => {
        state.resultsPerson = payload.resultsPerson;
        state.loading = false;
      })
      .addCase(getCreditsPerson.rejected, (state, { payload }) => {
        state.personError = payload;
      });
  },
});

export const { setloading } = detailFilmsSlice.actions;

export default detailFilmsSlice.reducer;
