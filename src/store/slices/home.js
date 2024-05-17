import axios from 'axios'
import Request from '../../helpers/request'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// export const getFilmsPopular = createAsyncThunk(
//   'homeRequest/getFilmsPopular',
//   async (_, { rejectedWithValue }) => {
//     try {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=5`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${
//               import.meta.env.VITE_APP_API_ACCESS_TOKEN
//             }`,
//           },
//         }
//       )
//       return response.data
//     } catch (error) {
//       console.log(error)
//       return rejectedWithValue(error.response.data)
//     }
//   }
// )

export const getFilmsPopular = createAsyncThunk(
  'homeRequest/getFilmsPopular',
  async (data, { rejectedWithValue }) => {
    try {
      const response = await Request().get(
        `movie/popular?language=${data.language}&page=${data.page}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectedWithValue(error.response.data)
    }
  }
)

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    loading: true,
    results: undefined,
    popularError: undefined,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getFilmsPopular.fulfilled, (state, { payload }) => {
        state.results = payload.results
        state.loading = false
      })
      .addCase(getFilmsPopular.rejected, (state, { payload }) => {
        state.popularError = payload
      })
  },
})
export const { setLoading } = homeSlice.actions
export default homeSlice.reducer
