import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./users/slice.js";
import { newsReducer } from "./news/slice.js";
import { friendsReducer } from "./friends/slice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { noticesReducer } from "./notices/slice.js";
import { filtersReducer } from "./filters/slice.js";
import { citiesReducer } from "./cities/slice.js";

const authPersistConfig = {
  key: "root-auth",
  version: 1,
  storage,
  whitelist: ["token", "noticesFavorites", "noticesViewed"],
};

const noticesPersistConfig = {
  key: "root-favorites",
  version: 1,
  storage,
  whitelist: ["favorites"],
};

export const store = configureStore({
  reducer: {
    users: persistReducer(authPersistConfig, usersReducer),
    news: newsReducer,
    friends: friendsReducer,
    notices: persistReducer(noticesPersistConfig, noticesReducer),
    cities: citiesReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
