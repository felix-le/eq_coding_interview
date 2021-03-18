import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStatsHourlyApi, getStatsDailyApi } from '../../api/getStats';
import dayjs from 'dayjs';
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
      state.sHourlyApi = action.payload.map((item) => {
        const newObj = {
          ...item,
          revenue: Number(Number(item.revenue).toFixed(2)),
          date: dayjs(item.date).format(' MM-DD'),
        };
        return newObj;
      });
    },
    [getSDaily.fulfilled]: (state, action) => {
      state.sDailyApi = action.payload.map((item) => {
        const newObj = {
          ...item,
          date: dayjs(item.date).format(' MM-DD'),
          impressions: Number(item.impressions),
          clicks: Number(item.clicks),
          revenue: Number(Number(item.revenue).toFixed(2)),
          CTR: (item.clicks / item.impressions) * 100,
        };

        return newObj;
      });
    },
  },
});

export default statsSlice.reducer;
