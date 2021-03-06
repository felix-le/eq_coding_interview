import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import eventSlice from './events';
import statsSlice from './stats';
import poiSlice from './poi';
const reducer = combineReducers({
  eventSlice,
  statsSlice,
  poiSlice,
});

const store = configureStore({
  reducer,
});

export default store;
