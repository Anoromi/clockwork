import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isClient } from "./utils/isClient";

export type Theme = "light" | "dark";

type State = {
  theme: Theme;
};

const initialState: State = {
  theme: "light",
};

const extrasSlice = createSlice({
  initialState,
  name: "extraStore",
  reducers: {
    changeTheme(state, data: PayloadAction<Theme>) {
      state.theme = data.payload;
      if (isClient()) localStorage.setItem("theme", state.theme);
    },
    switchTheme(state, data: PayloadAction<undefined>) {
      if (state.theme === "light") state.theme = "dark";
      else if (state.theme === "dark") state.theme = "light";
      if (isClient()) localStorage.setItem("theme", state.theme);
    },
  },
});

export const { changeTheme, switchTheme } = extrasSlice.actions;
export default extrasSlice.reducer;
