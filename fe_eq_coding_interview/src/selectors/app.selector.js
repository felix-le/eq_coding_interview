import { createSelector } from 'reselect';

export const isExpandDrawerSelector = createSelector(
  (state) => state.actionSlice,
  (app) => app.isExpandDrawer
);

export const isLoadingSelector = createSelector(
  (state) => state.actionSlice,
  (app) => app.isLoading
);
export const LayoutTypeSelector = createSelector(
  (state) => state.actionSlice,
  (app) => app.layoutType
);
