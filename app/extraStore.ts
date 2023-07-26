import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

type State = {
  theme: Theme;
};

const initialState: State = {
  theme: "light",
};

const extraSlice = createSlice({
  initialState,
  name: "extraStore",
  reducers: {
    changeTheme(state, data: PayloadAction<Theme>) {
      state.theme = data.payload
    },
    switchTheme(state, data: PayloadAction<undefined>) {
      if(state.theme === 'light')
        state.theme = 'dark'
      else if(state.theme === 'dark')
        state.theme = 'light'
    }
  },
});

export const {changeTheme, switchTheme} = extraSlice.actions;
export default extraSlice.reducer
