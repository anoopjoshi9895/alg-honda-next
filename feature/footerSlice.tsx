import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
import { IFooter } from "../models/models";
import { loadFooterData } from "../apiService/apiService";

export interface UserState {
  data: IFooter[];
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: UserState = {
  data: [],
  status: "idle",
};

export const getFooterAsync = createAsyncThunk("/getFooterAsync", async (locale: string) => {
  return await loadFooterData(locale);
});

export const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getFooterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFooterAsync.fulfilled, (state: any, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getFooterAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

// export const { getuserAsync} = userSlice.actions
export default footerSlice.reducer;
