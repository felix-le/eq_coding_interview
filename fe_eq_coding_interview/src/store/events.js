import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getEventHourlyApi, getEDailyApi } from '../api/getEvents';

// First create the thunk

export const getEHourly = createAsyncThunk('/events/hourly', () => {
  return getEventHourlyApi();
});

export const getEDaily = createAsyncThunk('/events/daily', () => {
  return getEDailyApi();
});

const eventSlice = createSlice({
  name: 'events',
  initialState: { eHourlyApi: [], eDailyApi: [] },
  extraReducers: {
    [getEHourly.fulfilled]: (state, action) => {
      state.eHourlyApi = action.payload;
    },
    [getEDaily.fulfilled]: (state, action) => {
      state.eDailyApi = action.payload;
    },
  },
});

export default eventSlice.reducer;
