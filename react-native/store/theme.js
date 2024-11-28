import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "theme",
  initialState: {
    isNight: true,
  },
  reducers: {
    toggleIsNight: (state, action) => {
      state = {
        isNight: !state.isNight,
      };
      return state;
    },
    setNightTheme: (state, action) => {
      state = {
        isNight: true,
      };
      return state;
    },
    setDefaultTheme: (state, action) => {
      state = {
        isNight: false,
      };
      return state;
    },
  },
});

export const { toggleIsNight, setNightTheme, setDefaultTheme } =
  authSlice.actions;

export default authSlice.reducer;
