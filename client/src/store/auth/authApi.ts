import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { LoginInterface } from "../../pages/Login";
import { RegisterInterface } from "../../pages/Register";
import { ForgetInterface } from "../../pages/ForgetPassword";
import { ResetInterface } from "../../pages/ResetPassword";

// register data
export const userRegister = createAsyncThunk("userRegister", async (data: RegisterInterface, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/register`, data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

// forget password
export const forgetPassword = createAsyncThunk("forgetPassword", async (data: ForgetInterface, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/forgetpassword`, data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

// reset password
export const resetPassword = createAsyncThunk("resetpassword", async (data: ResetInterface, { rejectWithValue }) => {
  try {
    console.log(data);
    const response = await axios.patch(`/api/resetpassword/${data.token}`, data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

// login
export const userLogin = createAsyncThunk("userLogin", async (data: LoginInterface, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/login`, data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

// logout
export const userLogout = createAsyncThunk("userLogout", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/logout`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

// me
export const userMe = createAsyncThunk("userMe", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/me`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});