import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEHourly, getEDaily } from '../store/events';
import { getSHourly, getSDaily } from '../store/stats';
import { getPoi } from '../store/poi';
import { combineFn } from '../helpers/helpers';
import '@carbon/charts/styles.css';
import GridLayout from '../modules/GridLayout';
import dayjs from 'dayjs';
import DataTable from '../modules/GridLayout/DataTable';

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

  const addons = [1, 2];
  // const [boardData, setBoardData] = useState([]);
  // Get data - setInitial value
  const pois = initialState.poiSlice.poiApi;
  const sHourly = initialState.statsSlice.sHourlyApi;
  const sDaily = initialState.statsSlice.sDailyApi;
  const eDaily = initialState.eventSlice.eDailyApi;
  const eHourly = initialState.eventSlice.eHourlyApi;

  // Data table
  const [rawDataTable, setRawDataTable] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  console.log(
    '🚀 ~ file: Dashboard.js ~ line 78 ~ Dashboard ~ dataTable',
    dataTable
  );

  // Data all of board
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
      data: dataTable,
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
        })
      );
    }
    setDataBoard({
      ...dataBoard,
      2: { ...dataBoard[2], data: dataNew },
    });
    // setDataTable(dataNew);
  }

  useEffect(() => {
    convertRawDataTable();
  }, [rawDataTable]);

  // requirement 2c

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

  return (
    <>
      <GridLayout
        addons={addons}
        boardData={dataBoard}
        headerData={headerData}
      />
      <h1>Hello</h1>
    </>
  );
};

export default Dashboard;
