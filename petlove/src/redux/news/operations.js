import { createAsyncThunk } from "@reduxjs/toolkit";
import { petloveApi } from "../users/operations.js";

export const fetchNews = createAsyncThunk(
  "news/getNews",
  async ({ page, keyword }, thunkAPI) => {
    try {
      const { data } = await petloveApi.get(
        `/news?page=${page}&keyword=${keyword}`
      );
      return data;
    } catch (error) {
      if (error.status === 404) {
        return thunkAPI.rejectWithValue("Not found news!");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
