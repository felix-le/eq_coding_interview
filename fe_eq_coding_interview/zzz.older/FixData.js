import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEHourly, getEDaily } from '../../store/events';
import { getSHourly, getSDaily } from '../../store/stats';
import { getPoi } from '../../store/poi';
import dayjs from 'dayjs';
const FixData = ({ setRawData }) => {
  const dispatch = useDispatch();
  const initialState = useSelector((state) => state);

  useEffect(() => {
    dispatch(getEHourly());
    dispatch(getEDaily());
    dispatch(getPoi());
    dispatch(getSHourly());
    dispatch(getSDaily());
  }, [dispatch]);

  async function setData() {
    const initialData = await {
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
  }

  return <> </>;
};

export default FixData;
