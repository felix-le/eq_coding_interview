import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import eventSlice from './events';
import statsSlice from './stats';
import poiSlice from './poi';
import actionSlice from './actions';
import boardSlice from './board.reducer';
const reducer = combineReducers({
  eventSlice,
  statsSlice,
  poiSlice,
  actionSlice,
  boardSlice,
});

const store = configureStore({
  reducer,
});

export default store;
