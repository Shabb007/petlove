import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const petloveApi = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
});

const setAuthHeader = (token) => {
  petloveApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  petloveApi.defaults.headers.common.Authorization = "";
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await petloveApi.post("/users/signup", credentials);
      setAuthHeader(data.token);
      toast.success("Registration successful!");
      return data;
    } catch (error) {
      if (error.status === 400) {
        toast.error("Invalid request body!");
        return thunkAPI.rejectWithValue("Invalid request body!");
      }
      if (error.status === 404) {
        toast.error("Not found service!");
        return thunkAPI.rejectWithValue("Not found service!");
      }
      if (error.status === 409) {
        toast.error("User already exists!");
        return thunkAPI.rejectWithValue("User already exists!");
      }
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "users/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await petloveApi.post("/users/signin", credentials);
      setAuthHeader(data.token);
      toast.success("Login successful!");
      return data;
    } catch (error) {
      if (error.status === 400) {
        toast.error("Invalid request body!");
        return thunkAPI.rejectWithValue("Invalid request body!");
      }
      if (error.status === 401) {
        toast.error("Invalid email or password!");
        return thunkAPI.rejectWithValue("Invalid email or password!");
      }
      if (error.status === 404) {
        toast.error("Not found service!");
        return thunkAPI.rejectWithValue("Not found service!");
      }
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    await petloveApi.post("/users/signout");
    clearAuthHeader();
    toast.success("Sign out success");
  } catch (error) {
    if (error.status === 401) {
      toast.error("User unauthorized!");
      return thunkAPI.rejectWithValue("User unauthorized!");
    }
    if (error.status === 404) {
      toast.error("Not found service!");
      return thunkAPI.rejectWithValue("Not found service!");
    }
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "users/refreshUser",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().users.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue("No valid token");
    }
    setAuthHeader(savedToken);
    try {
      const { data } = await petloveApi.get("/users/current");
      return data;
    } catch (error) {
      if (error.status === 401) {
        toast.error("User unauthorized!");
        return thunkAPI.rejectWithValue("User unauthorized!");
      }
      if (error.status === 404) {
        toast.error("Not found service!");
        return thunkAPI.rejectWithValue("Not found service!");
      }
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().users.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue("No valid token");
    }
    setAuthHeader(savedToken);
    try {
      const { data } = await petloveApi.get("/users/current/full");
      return data;
    } catch (error) {
      if (error.status === 401) {
        toast.error("User unauthorized!");
        return thunkAPI.rejectWithValue("User unauthorized!");
      }
      if (error.status === 404) {
        toast.error("Not found service!");
        return thunkAPI.rejectWithValue("Not found service!");
      }
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData, thunkAPI) => {
    const savedToken = thunkAPI.getState().users.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue("No valid token");
    }
    setAuthHeader(savedToken);
    console.log("API request data:", userData);
    try {
      const { data } = await petloveApi.patch("/users/current/edit", userData);
      toast.success("User information updated successfully!");
      return data;
    } catch (error) {
      console.log("API Error:", error);
      console.log("Error response:", error.response);
      if (error.response?.status === 400) {
        toast.error("Invalid request body!");
        return thunkAPI.rejectWithValue("Invalid request body!");
      }
      if (error.status === 404) {
        toast.error("Not found service!");
        return thunkAPI.rejectWithValue("Not found service!");
      }
      if (error.status === 409) {
        toast.error("User already exists!");
        return thunkAPI.rejectWithValue("User already exists!");
      }
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUserPet = createAsyncThunk(
  "users/addUserPet",
  async (pet, thunkAPI) => {
    const savedToken = thunkAPI.getState().users.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue("No valid token");
    }
    setAuthHeader(savedToken);
    try {
      const { data } = await petloveApi.post("/users/current/pets/add", pet);
      toast.success("Pet added successfully!");
      return data;
    } catch (error) {
      if (error.status === 400) {
        toast.error("Invalid request body!");
        return thunkAPI.rejectWithValue("Invalid request body!");
      }
      if (error.status === 404) {
        toast.error("Not found service!");
        return thunkAPI.rejectWithValue("Not found service!");
      }
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUserPet = createAsyncThunk(
  "users/deleteUserPet",
  async (petId, thunkAPI) => {
    const savedToken = thunkAPI.getState().users.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue("No valid token");
    }
    setAuthHeader(savedToken);
    try {
      const { data } = await petloveApi.delete(
        `/users/current/pets/remove/${petId}`
      );
      return data.pets;
    } catch (error) {
      if (error.status === 400) {
        toast.error("This id is not valid!");
        return thunkAPI.rejectWithValue("This id is not valid!");
      }
      if (error.status === 404) {
        toast.error("Not found pet!");
        return thunkAPI.rejectWithValue("Not found pet!");
      }
      if (error.status === 409) {
        toast.error("You aren't owner of this pet!");
        return thunkAPI.rejectWithValue("You aren't owner of this pet!");
      }
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getViewedNotice = createAsyncThunk(
  "users/getViewedNotice",
  async (noticeId, thunkAPI) => {
    const savedToken = thunkAPI.getState().users.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue("No valid token");
    }
    setAuthHeader(savedToken);
    try {
      const { data } = await petloveApi.get(`/notices/${noticeId}`);
      return data;
    } catch (error) {
      if (error.status === 400) {
        toast.error("This id is not valid!");
        return thunkAPI.rejectWithValue("This id is not valid!");
      }
      if (error.status === 404) {
        toast.error("This notice is not found in notices!");
        return thunkAPI.rejectWithValue("This notice is not found in notices!");
      }
      if (error.status === 409) {
        toast.error("This notice is already in viewed!");
        return thunkAPI.rejectWithValue("This notice is already in viewed!");
      }
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
