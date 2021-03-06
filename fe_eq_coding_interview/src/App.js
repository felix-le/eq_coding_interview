import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEHourly } from './store/events';
import './App.css';

function App() {
  const checkEHourly = useSelector((state) => console.log(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEHourly());
  }, [dispatch]);

  return (
    <div className='App'>
      <h1>hello</h1>
    </div>
  );
}

export default App;
