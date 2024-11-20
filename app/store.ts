import { configureStore } from "@reduxjs/toolkit";
import { activityApi } from "./[locale]/library/api";
import libraryReducer from "./[locale]/library/libraryStore";
import timerReducer from "./[locale]/timer/timerStore";
import extraReducer from "./extrasStore";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    library: libraryReducer,
    extra: extraReducer,
    [activityApi.reducerPath]: activityApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(activityApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
