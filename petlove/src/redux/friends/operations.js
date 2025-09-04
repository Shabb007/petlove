import { createAsyncThunk } from "@reduxjs/toolkit";
import { petloveApi } from "../users/operations.js";

export const fetchFriends = createAsyncThunk(
  "friends/getFriends",
  async (_, thunkAPI) => {
    try {
      const { data } = await petloveApi.get("/friends/");
      return data;
    } catch (error) {
      if (error.status === 404) {
        return thunkAPI.rejectWithValue("Not found friends!");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
