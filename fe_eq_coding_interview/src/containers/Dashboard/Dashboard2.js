import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEHourly, getEDaily } from '../../store/events';
import { getSHourly, getSDaily } from '../../store/stats';
import { getPoi } from '../../store/poi';
import dayjs from 'dayjs';

const Dashboard = () => {
  const dispatch = useDispatch();
  const initialState = useSelector((state) => state);
  const initialData = {
    eDaily: initialState.eventSlice.eDailyApi.map((item) => {
      const newObj = {
        ...item,
        events: Number(item.events),
        date: dayjs(item.date).format('DD-MM-YYYY'),
      };
      return newObj;
    }),
    eHourlyApi: initialState.eventSlice.eHourlyApi.map((item) => {
      const newObj = {
        ...item,
        date: dayjs(item.date).format('DD-MM-YYYY'),
      };
      return newObj;
    }),
    poi: initialState.poiSlice.poiApi,
    //
    sDaily: initialState.statsSlice.sDailyApi.map((item) => {
      const newObj = {
        ...item,
        date: dayjs(item.date).format('DD-MM-YYYY'),
        impressions: Number(item.impressions),
        clicks: Number(item.clicks),
        revenue: Number(Number(item.revenue).toFixed(2)),
      };
      return newObj;
    }),
    sHourlyApi: initialState.statsSlice.sHourlyApi.map((item) => {
      const newObj = {
        ...item,
        revenue: Number(Number(item.revenue).toFixed(2)),
        date: dayjs(item.date).format('DD-MM-YYYY'),
      };
      return newObj;
    }),
  };
  console.log(
    '🚀 ~ file: Dashboard2.js ~ line 21 ~ Dashboard ~ initialData',
    initialData
  );

  // const [rawData, setRawData] = useState({});
  // console.log(
  //   '🚀 ~ file: Dashboard2.js ~ line 17 ~ Dashboard ~ rawData',
  //   rawData
  // );

  // let testApi = initialState.eventSlice.eDailyApi.map((item) => {
  // const newObj = { ...item, events: Number(item.events) };
  // return newObj;
  // });

  useEffect(() => {
    dispatch(getEHourly());
    dispatch(getEDaily());
    dispatch(getPoi());
    dispatch(getSHourly());
    dispatch(getSDaily());
  }, [dispatch]);

  // let testApi = initialState.eventSlice.eDailyApi.map((item) => {
  //   const newObj = { ...item, events: Number(item.revenue) };
  //   return newObj;
  // });

  return (
    <>
      <h1>Hello</h1>
    </>
  );
};

export default Dashboard;
