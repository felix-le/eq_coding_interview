import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import eHourlySlice from './events';

const reducer = combineReducers({
  eHourlySlice,
});

const store = configureStore({
  reducer,
});

export default store;
