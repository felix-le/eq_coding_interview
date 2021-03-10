import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEHourly, getEDaily } from '../store/events';
import { getSHourly, getSDaily } from '../store/stats';
import { getPoi } from '../store/poi';
import { combineFn } from '../helpers';
import '@carbon/charts/styles.css';
import GridLayout from '../modules/GridLayout';
import dayjs from 'dayjs';

const headerData = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'CTR',
    header: 'CTR (%)',
  },
  {
    key: 'type',
    header: 'Campaign Type',
  },
  {
    key: 'date',
    header: 'Date',
  },
  {
    key: 'clicks',
    header: 'Clicks',
  },
  {
    key: 'impressions',
    header: 'Impressions',
  },
  {
    key: 'avgCPC',
    header: 'AvgCPC',
  },
  {
    key: 'avgCPV',
    header: 'AvgCPV',
  },
  {
    key: 'revenue',
    header: 'Revenue (1B)',
  },
];

const optionViews = [
  {
    label: 'CTR (Clicks/Impressions)',
    value: {
      bottom: { mapsTo: 'impressions', scaleType: 'clicks' },
      left: { mapsTo: 'clicks', scaleType: 'linear' },
    },
  },
  {
    label: 'Clicks/revenue (AvgCPC)',
    value: {
      bottom: { mapsTo: 'click', scaleType: 'avgCPC' },
      left: { mapsTo: 'revenue', scaleType: 'linear' },
    },
  },
  {
    label: 'CTR/Time',
    value: {
      bottom: { mapsTo: 'hour', scaleType: 'clicks' },
      left: { mapsTo: 'CTR', scaleType: 'linear' },
    },
  },
];

const Dashboard = () => {
  const initialState = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEHourly());
    dispatch(getEDaily());
    dispatch(getPoi());
    dispatch(getSHourly());
    dispatch(getSDaily());
  }, [dispatch]);

  let testApi = initialState.eventSlice.eDailyApi.map((item) => {
    const newObj = { ...item, events: Number(item.revenue) };
    return newObj;
  });

  const addons = [1, 2, 3]; // number of chart/table
  //set number of opt select (2.c)
  const [indexSelected, setIndexSelected] = useState(0);

  // Get data from API - initial value
  const pois = initialState.poiSlice.poiApi;
  const sHourly = initialState.statsSlice.sHourlyApi.map((item) => {
    const newObj = { ...item, events: Number(item.revenue) };
    return newObj;
  });

  const sDaily = initialState.statsSlice.sDailyApi;
  const eDaily = initialState.eventSlice.eDailyApi;
  const eHourly = initialState.eventSlice.eHourlyApi.map((item) => {
    const newObj = { ...item, events: Number(item.revenue) };
    return newObj;
  });
  // Combine to get an array of poi_id - raw data
  function combineArr() {
    const poiShourly = combineFn(pois, sHourly, 'poi_id');
    const pShSd = combineFn(poiShourly, sDaily, 'revenue');
    const pShSdEd = combineFn(pShSd, eDaily, 'date');
    const final = combineFn(pShSdEd, eHourly, 'events');
    setRawDataTable(final);
  }

  useEffect(() => {
    combineArr();
  }, [pois, sHourly, sDaily, eDaily, eHourly]);

  // Data table requirement 2b
  const [rawDataTable, setRawDataTable] = useState([]);
  const [dataBoard, setDataBoard] = useState({
    1: {
      data: [],
      options: {
        axes: {
          bottom: { scaleType: 'time', mapsTo: 'date' },
          left: { mapsTo: 'impressions' },
          curve: 'curveMonotoneX',
          height: '100%',
          title: 'Stacked area (time series)',
        },
      },
      type: 'stackedArea',
    },
    2: {
      type: 'table',
      data: [],
    },
    3: {
      data: [],
      options: {
        axes: optionViews[0].value,
        curve: 'curveMonotoneX',
        height: '100%',
        legend: { alignment: 'center', enabled: true },
        title: optionViews[0].label,
        tooltip: { enabled: true, showTotal: true },
        color: {
          scale: {
            'EQ Works': 'blue',
          },
          'CN Tower': '#FF6633',
          'Niagara Falls': '#00CC00',
          'Vancouver Harbour': '#FFDC00',
        },
      },
      type: 'line',
    },
  });

  // Requirement 2b
  function convertRawDataTable() {
    let dataNew = [];
    if (rawDataTable.length > 0) {
      rawDataTable.map((item) =>
        dataNew.push({
          ...item,
          id: item.poi_id.toString(),
          date: dayjs(item.date).format('DD-MM-YYYY'),
          // 1B
          revenue: Number(item.revenue),
          CTR: (item.clicks / item.impressions) * 100,
          status: 'Pause',
          type: 'Display',
          avgCPC: item.revenue / item.clicks,
          avgCPV: (item.revenue / item.impressions) * 1000,
          isShowSearch: false,
          group: item.name,
          impressions: Number(item.impressions),
          hour: Number(item.hour),
          clicks: Number(item.clicks),
        })
      );
    }

    setDataBoard({
      ...dataBoard,
      2: { ...dataBoard[2], data: dataNew },
      3: { ...dataBoard[3], data: dataNew },
    });
  }
  // Requirement 2c

  useEffect(() => {
    dataBoard[3].options.axes = optionViews[indexSelected].value;
    dataBoard[3].options.title = optionViews[indexSelected].label;
    setDataBoard({ ...dataBoard });
  }, [indexSelected]);

  useEffect(() => {
    convertRawDataTable();
  }, [rawDataTable]);

  return (
    <>
      <GridLayout
        addons={addons}
        boardData={dataBoard}
        headerData={headerData}
        optionViews={optionViews}
        indexSelected={indexSelected}
        setIndexSelected={setIndexSelected}
      />
    </>
  );
};

export default Dashboard;
