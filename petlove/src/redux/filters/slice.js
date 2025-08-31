import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  locationId: "",
  category: "",
  species: "",
  sex: "",
  byPrice: "",
  byPopularity: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeFilters } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
