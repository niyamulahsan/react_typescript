import { createSlice } from "@reduxjs/toolkit";
import {createData, fetchData, fetchSingleData, updateSingleData, deleteSingleData} from "./infoApi";

export interface InfoState{
  infos: any;
  loading: boolean;
};

const initialState: InfoState = {
  infos: [],
  loading: false
};

export const infoSlice = createSlice({
  name: "infoSlice",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(createData.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(createData.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(createData.rejected, (state, _) => {
        state.loading = false;
      });

    builder
      .addCase(fetchData.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.infos = action.payload;
      })
      .addCase(fetchData.rejected, (state, _) => {
        state.loading = false;
      });

    builder
      .addCase(fetchSingleData.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(fetchSingleData.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(fetchSingleData.rejected, (state, _) => {
        state.loading = false;
      });

    builder
      .addCase(updateSingleData.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(updateSingleData.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(updateSingleData.rejected, (state, _) => {
        state.loading = false;
      });

    builder
      .addCase(deleteSingleData.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(deleteSingleData.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(deleteSingleData.rejected, (state, _) => {
        state.loading = false;
      });
  },
});

export default infoSlice.reducer;
