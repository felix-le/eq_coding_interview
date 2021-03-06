import { createSlice } from '@reduxjs/toolkit';

const actionSlice = createSlice({
  name: 'actions',
  initialState: {
    isExpandDrawer: true,
    isLoading: false,
    layoutType: 'grid',
  },
  reducers: {
    explanDrawer: (state, action) => {
      state.isExpandDrawer = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLayoutType: (state, action) => {
      state.layoutType = action.payload;
    },
  },
});

export default actionSlice.reducer;

const { explanDrawer, setLoading, setLayoutType } = actionSlice.actions;

export const setExplanDrawer = (isShow) => async (dispatch) => {
  try {
    dispatch(explanDrawer({ isShow }));
  } catch (e) {
    console.log('🚀 ~ file: actions.js ~ line 31 ~ setExplanDrawer ~ e', e);
  }
};
