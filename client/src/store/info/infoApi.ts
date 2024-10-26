import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { InfoInterface } from "../../pages/Dashboard";

// create data
export const createData = createAsyncThunk("createData", async (data: InfoInterface, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/info`, data);
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// fetch data
export const fetchData = createAsyncThunk("fetchData", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/info`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// fetch single data
export const fetchSingleData = createAsyncThunk("fetchSingleData", async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/info/${id}`);
      return response.data.info;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update single data
export const updateSingleData = createAsyncThunk("updateSingleData", async (data: InfoInterface, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/info/${data._id}`, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// delete single data
export const deleteSingleData = createAsyncThunk("deleteSingleData", async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/info/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);