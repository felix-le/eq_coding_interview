import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStatsHourlyApi, getStatsDailyApi } from '../api/getStats';

export const getSHourly = createAsyncThunk('/stats/hourly', () => {
  return getStatsHourlyApi();
});

export const getSDaily = createAsyncThunk('/stats/daily', () => {
  return getStatsDailyApi();
});

const statsSlice = createSlice({
  name: 'stats',
  initialState: { sHourlyApi: [], sDailyApi: [] },
  extraReducers: {
    [getSHourly.fulfilled]: (state, action) => {
      state.sHourlyApi = action.payload;
    },
    [getSDaily.fulfilled]: (state, action) => {
      state.sDailyApi = action.payload;
    },
  },
});

export default statsSlice.reducer;
