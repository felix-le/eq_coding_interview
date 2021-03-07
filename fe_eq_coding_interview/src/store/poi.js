import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPoiApi } from '../api/getPoiApi';

export const getPoi = createAsyncThunk('/poi', async () => {
  return getPoiApi();
});
const poiSlice = createSlice({
  name: 'poiSlice',
  initialState: { poiApi: [] },
  extraReducers: {
    [getPoi.fulfilled]: (state, action) => {
      state.poiApi = action.payload;
    },
  },
});

export default poiSlice.reducer;
