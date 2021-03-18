import { createSlice } from '@reduxjs/toolkit';

export const updateFormalData = (data) => {
  return data;
};

const formalDataSlice = createSlice({
  name: 'formalData',
  initialState: {
    formalData: [],
  },
  extraReducers: {
    [updateFormalData.fulfilled]: (state, action) => {
      state.formalData = action;
    },
  },
});

export default formalDataSlice.reducer;
