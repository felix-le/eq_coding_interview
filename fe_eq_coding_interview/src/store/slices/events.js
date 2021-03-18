import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getEventHourlyApi, getEDailyApi } from '../../api/getEvents';
import dayjs from 'dayjs';
// First create the thunk

export const getEHourly = createAsyncThunk('/events/hourly', () => {
  return getEventHourlyApi();
});

export const getEDaily = createAsyncThunk('/events/daily', () => {
  return getEDailyApi();
});

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    eHourlyApi: [],
    eDailyApi: [],
  },
  extraReducers: {
    [getEHourly.fulfilled]: (state, action) => {
      state.eHourlyApi = action.payload.map((item) => {
        const newObj = {
          ...item,
          date: dayjs(item.date).format('YYYY-MM-DD'),
          group: `Event ${item.events}`,
        };
        return newObj;
      });
    },
    [getEDaily.fulfilled]: (state, action) => {
      state.eDailyApi = action.payload.map((item) => {
        const newObj = {
          ...item,
          events: Number(item.events),
          date: dayjs(item.date).format('YYYY-MM-DD'),
        };
        return newObj;
      });
    },
  },
});

export default eventSlice.reducer;
