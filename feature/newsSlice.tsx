import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INewsItem } from "../models/models";
import { loadNewsItems } from "../apiService/apiService";


export interface UserState {
  data: INewsItem[];
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: UserState = {
  data: [],
  status: "idle",
};

export const getNewsAsync = createAsyncThunk("/getNewsAsync", async (locale: string) => {
  return await loadNewsItems(locale);
});

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getNewsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewsAsync.fulfilled, (state: any, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getNewsAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default newsSlice.reducer;
