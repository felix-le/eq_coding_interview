import { useState, useEffect } from 'react';
import GridLayout from '../../modules/GridLayout';
const optionViews = [
  {
    label: 'CTR (Clicks/Impressions)',
    value: {
      bottom: { mapsTo: 'impressions' },
      left: { mapsTo: 'clicks' },
    },
  },
  {
    label: 'Clicks/revenue (AvgCPC)',
    value: {
      bottom: { mapsTo: 'click' },
      left: { mapsTo: 'revenue' },
    },
  },
];

const headerDataTable = [
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
const addons = [1, 2, 3]; // number of chart/table
const LayoutData = ({ stackedAreaChart, tableData, dataBoard3 }) => {
  const [indexSelected, setIndexSelected] = useState(0);
  console.log(
    '🚀 ~ file: LayoutData.js ~ line 64 ~ LayoutData ~ dataBoard3',
    dataBoard3
  );

  const optionCharts = [
    {
      axes: {
        bottom: { scaleType: 'time', mapsTo: 'date' },
        left: { mapsTo: 'events' },
      },
      curve: 'curveMonotoneX',
      height: '80%',
      title: 'Number events/days',
    },
    {
      type: 'table',
    },
    {
      axes: optionViews[0].value,
      curve: 'curveMonotoneX',
      height: '100%',
      title: optionViews[0].label,
      color: {
        scale: {
          'EQ Works': 'blue',
          'CN Tower': '#FF6633',
          'Niagara Falls': '#00CC00',
          'Vancouver Harbour': '#FFDC00',
        },
      },
    },
  ];
  const [boardData, setboardData] = useState({
    1: {
      data: stackedAreaChart,
      options: optionCharts[0],
      id: 123,
      type: 'stackedArea',
    },
    2: {
      type: optionCharts[1].type,
    },
    3: {
      data: dataBoard3,
      options: optionCharts[2],
      type: 'line',
    },
  });

  useEffect(() => {
    if (stackedAreaChart.length > 0) {
      boardData[1].data = stackedAreaChart;
    }
    if (tableData.length > 0) {
      boardData[2].data = tableData.map((item) => {
        const newObj = { ...item, id: item.poi_id.toString() };
        return newObj;
      });
    }
    if (dataBoard3.length > 0) {
      boardData[3].data = dataBoard3;
    }
    setboardData({ ...boardData });
  }, [stackedAreaChart, tableData, dataBoard3]);

  useEffect(() => {
    boardData[3].options.axes = optionViews[indexSelected].value;
    boardData[3].options.title = optionViews[indexSelected].label;
    setboardData({ ...boardData });
  }, [indexSelected]);

  return (
    <>
      {tableData.length > 0 && (
        <GridLayout
          boardData={boardData}
          addons={addons}
          headerData={headerDataTable}
          optionViews={optionViews}
          indexSelected={indexSelected}
          setIndexSelected={setIndexSelected}
        />
      )}
    </>
  );
};

export default LayoutData;
