import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchCities, getCitiesByKeyword } from "./operations.js";

const initialState = {
  cities: [],
  isLoading: false,
  error: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(getCitiesByKeyword.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addMatcher(
        isAnyOf(fetchCities.pending, getCitiesByKeyword.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchCities.fulfilled, getCitiesByKeyword.fulfilled),
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchCities.rejected, getCitiesByKeyword.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const citiesReducer = citiesSlice.reducer;
