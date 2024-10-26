import { createSlice } from "@reduxjs/toolkit";
import { userRegister, forgetPassword, resetPassword, userLogin, userLogout, userMe } from "./authApi";

export interface InitialState {
  authuser: any;
  loading: boolean;
  auth: boolean;
};

let initialState: InitialState = {
  authuser: [],
  loading: false,
  auth: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(userRegister.rejected, (state, _) => {
        state.loading = false;
      });

    builder
      .addCase(forgetPassword.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(forgetPassword.rejected, (state, _) => {
        state.loading = false;
      });

    builder
      .addCase(resetPassword.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, _) => {
        state.loading = false;
      });

    builder
      .addCase(userLogin.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(userLogin.rejected, (state, _) => {
        state.loading = false;
      });

    builder
      .addCase(userMe.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(userMe.fulfilled, (state, action) => {
        state.loading = false;
        state.authuser = action.payload.auth;
      })
      .addCase(userMe.rejected, (state, _) => {
        state.loading = false;
      });

    builder
      .addCase(userLogout.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state, _) => {
        state.loading = false;
        state.authuser = [];
      })
      .addCase(userLogout.rejected, (state, _) => {
        state.loading = false;
      });
  }
});

export default authSlice.reducer;
export const {setAuth} = authSlice.actions;