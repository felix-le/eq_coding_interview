import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridLayout from '../modules/GridLayout';
import { getEHourly, getEDaily } from '../store/events';
import { getSHourly, getSDaily } from '../store/stats';
import { getPoi } from '../store/poi';
import { addonSelector } from '../selectors/board.selector';

const Dashboard = () => {
  const initialState = useSelector((state) => state);

  const addons = useSelector(addonSelector);
  const boardData = {
    1: initialState.eventSlice.eDailyApi,
    2: initialState.eventSlice.eHourlyApi,
    3: initialState.poiSlice.poiApi,
    4: initialState.statsSlice.sHourlyApi,
    5: initialState.statsSlice.sDailyApi,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEHourly());
    dispatch(getEDaily());
    dispatch(getPoi());
    dispatch(getSHourly());
    dispatch(getSDaily());
  }, [dispatch]);

  // const headerApi = [
  //   {
  //     title: 'eventSlice',
  //   },
  //   {
  //     title: 'poiSlice',
  //   },
  //   {
  //     title: 'statsSlice',
  //   },
  // ];

  return (
    <>
      <h1>hello</h1>
      <GridLayout addons={addons} boardData={boardData} />
    </>
  );
};

export default Dashboard;
