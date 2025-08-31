import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addUserPet,
  deleteUserPet,
  getCurrentUser,
  logIn,
  logOut,
  refreshUser,
  registerUser,
  updateUser,
} from "./operations.js";

const initialState = {
  user: {
    name: null,
    email: null,
    phone: null,
    avatar: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
  noticesFavorites: [],
  noticesViewed: [],
  pets: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addNoticeViewed(state, action) {
      const exist = state.noticesViewed.some(
        (notice) => notice._id === action.payload._id
      );
      if (!exist) {
        state.noticesViewed.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.noticesFavorites = action.payload.noticesFavorites;
        state.pets = action.payload.pets;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.phone = action.payload.phone;
        state.user.avatar = action.payload.avatar;
        state.token = action.payload.token;
        state.noticesFavorites = action.payload.noticesFavorites;
        state.pets = action.payload.pets;
        state.isLoggedIn = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.phone = action.payload.phone;
        state.user.avatar = action.payload.avatar;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(addUserPet.fulfilled, (state, action) => {
        state.pets = action.payload.pets;
      })
      .addCase(deleteUserPet.fulfilled, (state, action) => {
        state.pets = action.payload.pets;
      })
      .addMatcher(
        isAnyOf(
          registerUser.pending,
          logIn.pending,
          logOut.pending,
          refreshUser.pending,
          getCurrentUser.pending,
          updateUser.pending,
          addUserPet.pending,
          deleteUserPet.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerUser.fulfilled,
          logIn.fulfilled,
          logOut.fulfilled,
          refreshUser.fulfilled,
          getCurrentUser.fulfilled,
          updateUser.fulfilled,
          addUserPet.fulfilled,
          deleteUserPet.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerUser.rejected,
          logIn.rejected,
          logOut.rejected,
          refreshUser.rejected,
          getCurrentUser.rejected,
          updateUser.rejected,
          addUserPet.rejected,
          deleteUserPet.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { addNoticeViewed } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
