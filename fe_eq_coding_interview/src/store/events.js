import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getEventHourlyApi, geteDailyApi } from '../api/getHourly';

// First create the thunk

export const getEHourly = createAsyncThunk('/events/hourly', async () => {
  return await getEventHourlyApi();
});

export const getEDaily = createAsyncThunk('/events/daily', async () => {
  return await geteDailyApi();
});

const eHourlySlice = createSlice({
  name: 'eHourly',
  initialState: { eHourlyApi: [] },
  extraReducers: {
    [getEHourly.fulfilled]: (state, action) => {
      state.eHourlyApi = action.payload;
    },
  },
});

export default eHourlySlice.reducer;
