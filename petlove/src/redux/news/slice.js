import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./operations.js";

const initialState = {
  news: [],
  isLoading: false,
  error: null,
  totalPages: 0,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const newsReducer = newsSlice.reducer;
