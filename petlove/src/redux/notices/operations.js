import { createAsyncThunk } from "@reduxjs/toolkit";
import { petloveApi } from "../users/operations.js";

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async ({ page = 1, queryParams }, thunkAPI) => {
    try {
      const { data } = await petloveApi.get(
        `/notices?page=${page}&${queryParams}`
      );
      return data;
    } catch (error) {
      if (error.status === 404) {
        return thunkAPI.rejectWithValue("Not found notices!");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getNoticeById = createAsyncThunk(
  "notices/getNoticeById",
  async (noticeId, thunkAPI) => {
    try {
      const { data } = await petloveApi.get(`/notices/${noticeId}`);
      return data;
    } catch (error) {
      if (error.status === 400) {
        return thunkAPI.rejectWithValue("This id is not valid!");
      }
      if (error.status === 404) {
        return thunkAPI.rejectWithValue("This notice is not found!");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getNoticeCategories = createAsyncThunk(
  "notices/getNoticeCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await petloveApi.get("/notices/categories");
      return data;
    } catch (error) {
      if (error.status === 404) {
        return thunkAPI.rejectWithValue("Not found categories!");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getNoticeGender = createAsyncThunk(
  "notices/getNoticeGender",
  async (_, thunkAPI) => {
    try {
      const { data } = await petloveApi.get("/notices/sex");
      return data;
    } catch (error) {
      if (error.status === 404) {
        return thunkAPI.rejectWithValue("Not found pet gender!");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getNoticeSpecies = createAsyncThunk(
  "notices/getNoticeSpecies",
  async (_, thunkAPI) => {
    try {
      const { data } = await petloveApi.get("/notices/species");
      return data;
    } catch (error) {
      if (error.status === 404) {
        return thunkAPI.rejectWithValue("Not found species!");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addNoticeFavorites = createAsyncThunk(
  "notices/addNoticeFavorites",
  async (noticeId, thunkAPI) => {
    try {
      const { data } = await petloveApi.post(
        `/notices/favorites/add/${noticeId}`
      );
      return data;
    } catch (error) {
      if (error.status === 400) {
        return thunkAPI.rejectWithValue("This id is not valid!");
      }
      if (error.status === 404) {
        return thunkAPI.rejectWithValue("This notice is not found in notices!");
      }
      if (error.status === 409) {
        return thunkAPI.rejectWithValue("This notice is already in favorites!");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteNoticeFavorites = createAsyncThunk(
  "notices/deleteNoticeFavorites",
  async (noticeId, thunkAPI) => {
    try {
      const { data } = await petloveApi.delete(
        `/notices/favorites/remove/${noticeId}`
      );
      return data;
    } catch (error) {
      if (error.status === 400) {
        return thunkAPI.rejectWithValue("This id is not valid!");
      }
      if (error.status === 404) {
        return thunkAPI.rejectWithValue("This notice is not found in notices!");
      }
      if (error.status === 409) {
        return thunkAPI.rejectWithValue(
          "This notice is not found in favorites!"
        );
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
