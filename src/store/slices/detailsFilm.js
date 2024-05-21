import Request from "../../helpers/request";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

export const getDetailFilm = createAsyncThunk(
    'detailFilmRequest/getDetailFilm',
    async (data, {rejectedWithValue}) => {
        try{
            const response = await Request.get(``);
            return response.data;
        }catch (error){
            console.log(error)
            return rejectedWithValue(error.response.data)
        }
    }
)