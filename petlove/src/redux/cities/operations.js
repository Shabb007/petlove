import { createAsyncThunk } from "@reduxjs/toolkit";
import { petloveApi } from "../users/operations.js";

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (_, thunkAPI) => {
    try {
      const { data } = await petloveApi.get("/cities/locations");
      return data;
    } catch (error) {
      if (error.status === 404) {
        return thunkAPI.rejectWithValue("Not found cities!");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCitiesByKeyword = createAsyncThunk(
  "cities/getCitiesByKeyword",
  async (keyword, thunkAPI) => {
    try {
      const { data } = await petloveApi.get(`/cities/?keyword=${keyword}`);
      return data;
    } catch (error) {
      if (error.status === 400) {
        return thunkAPI.rejectWithValue("Invalid request query!");
      }
      if (error.status === 404) {
        return thunkAPI.rejectWithValue("Not found cities!");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
