import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEHourly, getEDaily } from '../store/events';
import { getSHourly, getSDaily } from '../store/stats';
import { getPoi } from '../store/poi';
import { combineFn } from '../helpers/helpers';
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

// const optionView = [
//   {label: }
// ]

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

  const addons = [1, 2, 3];
  // const [boardData, setBoardData] = useState([]);
  // Get data - setInitial value
  const pois = initialState.poiSlice.poiApi;
  const sHourly = initialState.statsSlice.sHourlyApi;

  const sDaily = initialState.statsSlice.sDailyApi;
  const eDaily = initialState.eventSlice.eDailyApi;
  const eHourly = initialState.eventSlice.eHourlyApi;
  // Combine to get an array of poi_id
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

  // Data table
  const [rawDataTable, setRawDataTable] = useState([]);
  const [dataBoard, setDataBoard] = useState({
    1: {
      data: [],
      options: {
        axes: {
          bottom: { scaleType: 'time', mapsTo: 'date' },
          left: { stacked: true, mapsTo: 'impressions' },
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
        axes: {
          bottom: { mapsTo: 'impressions', scaleType: 'CTR' },
          left: { mapsTo: 'clicks', scaleType: 'linear' },
        },
        curve: 'curveMonotoneX',
        height: '100%',
        legend: { alignment: 'center', enabled: true },
        title: 'Optimization rates (overall)',
        tooltip: { enabled: true, showTotal: true },
        color: {
          scale: { 'Dataset 1': 'blue' },
          'Dataset 2': '#FF6633',
          'Dataset 3': '#00CC00',
          'Dataset 4': '#FFDC00',
        },
      },
      type: 'line',
    },
  });

  // Requirement 2a
  function convertsHourly() {
    let newObj = { ...sHourly };
    let objArr = [];

    for (const obj in newObj) {
      const eleArr = {
        ...newObj[obj],
        group: `${newObj[obj].hour}`,
        impressions: Number(newObj[obj].impressions) + 0,
        revenue: Number(newObj[obj].revenue) + 0,
      };
      objArr.push(eleArr);
    }

    setDataBoard({
      ...dataBoard,
      1: { ...dataBoard[1], data: objArr },
    });
  }
  useEffect(() => {
    convertsHourly();
  }, [sHourly]);

  // Requirement 2b
  function convertRawDataTable() {
    let dataNew = [];
    if (rawDataTable.length > 0) {
      rawDataTable.map((item) =>
        dataNew.push({
          ...item,
          id: item.poi_id.toString(),
          date: dayjs(item.date).format('DD/MM/YYYY'),
          // 1B
          revenue: Number(item.revenue).toFixed(3),
          CTR: ((Number(item.clicks) / Number(item.impressions)) * 100).toFixed(
            2
          ),
          status: 'Pause',
          type: 'Display',
          avgCPC: (Number(item.revenue) / Number(item.clicks)).toFixed(2),
          avgCPV: (
            (Number(item.revenue) / Number(item.impressions)) *
            1000
          ).toFixed(2),
          isShowSearch: false,
          group: item.name,
        })
      );
    }
    setDataBoard({
      ...dataBoard,
      2: { ...dataBoard[2], data: dataNew },
      3: { ...dataBoard[3], data: dataNew },
    });
  }

  useEffect(() => {
    convertRawDataTable();
  }, [rawDataTable]);

  // requirement 2c

  return (
    <>
      <GridLayout
        addons={addons}
        boardData={dataBoard}
        headerData={headerData}
      />
    </>
  );
};

export default Dashboard;
