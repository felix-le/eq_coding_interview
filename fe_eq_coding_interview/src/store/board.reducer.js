import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const boardSlice = createSlice({
  name: 'boardSlice',
  initialState: {
    addon: [1, 2, 3, 4, 5],
    boardData: {
      poiState: [],
      eHourlyState: [],
      edailyState: [],
      sHourlyState: [],
      sDailyState: [],
    },
  },
  reducers: {
    poiStateFn: (state, action) => {
      state.boardData.poiState = action.payload;
    },
  },
});
export default boardSlice.reducer;
