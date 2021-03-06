import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEHourly, getEDaily } from './store/events';
import { getSHourly, getSDaily } from './store/stats';
import { getPoi } from './store/poi';

import './App.css';

function App() {
  const checkEHourly = useSelector((state) => console.log(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEHourly());
    dispatch(getEDaily());
    dispatch(getPoi());
    dispatch(getSHourly());
    dispatch(getSDaily());
  }, [dispatch]);

  return (
    <div className='App'>
      <h1>hello</h1>
    </div>
  );
}

export default App;
