import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridLayout from '../modules/GridLayout';
import { getEHourly, getEDaily } from '../store/events';
import { getSHourly, getSDaily } from '../store/stats';
import { getPoi } from '../store/poi';

const Dashboard = () => {
  const initialState = useSelector((state) => state);
  const [sumTable, setSumTable] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEHourly());
    dispatch(getEDaily());
    dispatch(getPoi());
    dispatch(getSHourly());
    dispatch(getSDaily());
  }, [dispatch]);

  const headerApi = [
    {
      title: 'eventSlice',
    },
    {
      title: 'poiSlice',
    },
    {
      title: 'statsSlice',
    },
  ];
  useEffect(() => {
    checkTable();
  }, [initialState]);

  const checkTable = () => {
    let sum = 0;
    if (initialState) {
      let arrNum = headerApi.map(
        (item) => Object.keys(initialState[item.title]).length
      );
      sum = arrNum.reduce((a, b) => a + b);
    }
    setSumTable(sum);
  };

  return (
    <>
      <h1>hello</h1>
      {/* <GridLayout tableNumber={sumTable} /> */}
    </>
  );
};

export default Dashboard;
