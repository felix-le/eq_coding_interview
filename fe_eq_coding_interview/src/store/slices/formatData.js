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
      // console.log('🚀 ~ file: formatData.js ~ line 14 ~ action', action);
      state.formalData = action.payload;
    },
  },
});

export default formalDataSlice.reducer;
