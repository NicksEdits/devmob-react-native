import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "theme",
  initialState: {
    main: "dark",
  },
  reducers: {
    toggleMainTheme: (state, action) => {
      state = {
        main: state.main === "light" ? "dark" : "light",
      };
      return state;
    },
  },
});

export const { toggleMainTheme } = authSlice.actions;

export default authSlice.reducer;
