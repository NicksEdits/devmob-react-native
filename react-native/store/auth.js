import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "@/utils/api";
import * as LocalStorage from "@/utils/localStorage";
import { authStatus } from "@/utils/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
    status: authStatus.IDLE,
    error: null,
  },
  reducers: {
    setAuthState: (state, action) => {
      state = {
        token: action.payload?.token,
        user: action.payload?.user,
        isAuthenticated: !!action.payload?.token,
        status: authStatus.IDLE,
        error: null,
      };
    },
    setUser: (state, action) => {
      state = {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
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
          status: authStatus.LOADING,
          error: null,
        };
        // state.status = authStatus.LOADING;
        return state;
      })
      .addCase(initAuthState.fulfilled, (state, action) => {
        // state.pokefiche = action.payload;
        state = {
          ...action.payload,
          status: authStatus.IDLE,
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
          status: authStatus.FAILED,
          error: action.payload,
        };
        return state;
      });
  },
});

export const initAuthState = createAsyncThunk("auth/initAuthState", () => {
  return LocalStorage.getItemAsync("token").then((token) => {
    if (!token) {
      return {
        token: null,
        user: null,
        isAuthenticated: false,
      };
    }
    return get("users/me", token)
      .then((res) => {
        return {
          token,
          user: res,
          isAuthenticated: true,
        };
      })
      .catch((error) => {
        LocalStorage.deleteItem("token");
        throw error;
      });
  });
});

export const { setAuthState, setUser } = authSlice.actions;

export default authSlice.reducer;
