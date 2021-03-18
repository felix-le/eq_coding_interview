import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import eventSlice from './slices/events';
import statsSlice from './slices/stats';
import poiSlice from './slices/poi';
import formalDataSlice from './slices/formatData';
const reducer = combineReducers({
  eventSlice,
  statsSlice,
  poiSlice,
  formalDataSlice,
});

const store = configureStore({
  reducer,
});

export default store;
