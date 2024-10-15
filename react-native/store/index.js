import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { get } from "@/utils/api";
import * as LocalStorage from "@/utils/localStorage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {
    // initToken: async (state, action) => {
    //   const token = await LocalStorage.getItemAsync("token");
    //   const user = await get("users/me", token);
    //   state = {
    //     token,
    //     user: user,
    //     isAuthenticated: !!token,
    //   };
    //   return state;
    // },
    setAuthState: (state, action) => {
      state = {
        token: action.payload?.token,
        user: action.payload?.user,
        isAuthenticated: !!action.payload?.token,
        status: "idle",
        error: null,
      };
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initAuthState.pending, (state, action) => {
        state = {
          token: null,
          user: null,
          isAuthenticated: false,
          status: "loading",
          error: null,
        };
        // state.status = "loading";
        return state;
      })
      .addCase(initAuthState.fulfilled, (state, action) => {
        // state.pokefiche = action.payload;
        state = {
          ...action.payload,
          status: "idle",
          error: null,
        };
        return state;
        // state.status = "success";
      })
      .addCase(initAuthState.rejected, (state, action) => {
        state = {
          token: null,
          user: null,
          isAuthenticated: false,
          status: "failed",
          error: action.payload,
        };
        return state;
      });
  },
});

export const initAuthState = createAsyncThunk("auth/initAuthState", () => {
  return LocalStorage.getItemAsync("token").then((token) => {
    return get("users/me", token)
      .then((res) => {
        return {
          token,
          user: res.data,
          isAuthenticated: true,
        };
      })
      .catch((error) => {
        LocalStorage.deleteItem("token");
        throw error;
      });
  });
});

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
export const { setAuthState } = authSlice.actions;
