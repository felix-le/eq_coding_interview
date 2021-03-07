import { createSelector } from 'reselect';

export const addonSelector = createSelector(
  (state) => state.boardSlice,
  (boardSlice) => boardSlice.addon
);
