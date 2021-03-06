import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Dashboard from './containers/Dashboard';

function App() {
  // console.log(Object.keys(checkEHourly.eventSlice).length);

  return (
    <div className='App'>
      <Dashboard />
    </div>
  );
}

export default App;
