import { createSelector } from 'reselect';

export const boardEHourlyDataSelector = createSelector(
  (state) => state.eHourlyApi,
  (eHourlyApi) => eHourlyApi.boardData
);
