import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILandingScreenData } from "../models/models";
import { loadLandingPage } from "../apiService/apiService";

export interface UserState {
  data: ILandingScreenData[];
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: UserState = {
  data: [],
  status: "idle",
};

export const getSlideAsync = createAsyncThunk(
  "/getSlideAsync",
  async (locale: string) => {
    return await loadLandingPage(locale);
  }
);

export const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getSlideAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSlideAsync.fulfilled, (state: any, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getSlideAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default slideSlice.reducer;
