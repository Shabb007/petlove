import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addNoticeFavorites,
  deleteNoticeFavorites,
  fetchNotices,
  getNoticeById,
  getNoticeCategories,
  getNoticeGender,
  getNoticeSpecies,
} from "./operations.js";

const initialState = {
  notices: [],
  categories: [],
  genders: [],
  species: [],
  favorites: [],
  isLoading: false,
  error: null,
  totalPages: 0,
  notice: null,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.notices = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getNoticeById.fulfilled, (state, action) => {
        state.notice = action.payload;
      })
      .addCase(getNoticeCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getNoticeGender.fulfilled, (state, action) => {
        state.genders = action.payload;
      })
      .addCase(getNoticeSpecies.fulfilled, (state, action) => {
        state.species = action.payload;
      })
      .addCase(addNoticeFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(deleteNoticeFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addMatcher(
        isAnyOf(
          fetchNotices.pending,
          getNoticeById.pending,
          getNoticeCategories.pending,
          getNoticeGender.pending,
          getNoticeSpecies.pending,
          addNoticeFavorites.pending,
          deleteNoticeFavorites.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchNotices.fulfilled,
          getNoticeById.fulfilled,
          getNoticeCategories.fulfilled,
          getNoticeGender.fulfilled,
          getNoticeSpecies.fulfilled,
          addNoticeFavorites.fulfilled,
          deleteNoticeFavorites.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchNotices.rejected,
          getNoticeById.rejected,
          getNoticeCategories.rejected,
          getNoticeGender.rejected,
          getNoticeSpecies.rejected,
          addNoticeFavorites.rejected,
          deleteNoticeFavorites.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const noticesReducer = noticesSlice.reducer;
