import Request from "../../helpers/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Описание актёра
export const getDetailPerson = createAsyncThunk(
  "requestDetailPerson/getDetailPerson",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `person/${data.id}?language=${data.language}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);

// Данные соцсетей актёра
export const getExternalPerson = createAsyncThunk(
  "requestExternalPerson/getExternalPerson",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(`person/${data.id}/external_ids`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);
// Фильмы, сериалы и телешоу актёра
export const getCombinedPerson = createAsyncThunk(
  "requestCombinedPerson/getCombinedPerson",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `person/${data.id}/combined_credits?language=${data.language}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectedWithValue(error.response.data);
    }
  }
);

const detailPersonSlice = createSlice({
  name: "detailsPerson",
  initialState: {
    results: undefined,
    resultsExt: undefined,
    resultsComb: undefined,
    loading: true,
    error: undefined,
    errorExt: undefined,
    errorComb: undefined,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailPerson.fulfilled, (state, { payload }) => {
        state.results = payload;
        state.loading = false;
      })
      .addCase(getDetailPerson.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getExternalPerson.fulfilled, (state, { payload }) => {
        state.resultsExt = payload;
        state.loading = false;
      })
      .addCase(getExternalPerson.rejected, (state, { payload }) => {
        state.errorExt = payload;
      })
      .addCase(getCombinedPerson.fulfilled, (state, { payload }) => {
        state.resultsComb = payload;
        state.loading = false;
      })
      .addCase(getCombinedPerson.rejected, (state, { payload }) => {
        state.errorComb = payload;
      });
  },
});

export const { setLoading } = detailPersonSlice.actions;
export default detailPersonSlice.reducer;
