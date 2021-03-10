import { useState, useEffect } from 'react';
import GridLayout from '../../modules/GridLayout';
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
const addons = [1, 2]; // number of chart/table
const LayoutData = ({ stackedAreaChart, tableData }) => {
  // const newTableData =
  // tableData.data.map((item) => {
  //   const newObj = {
  //     ...item,
  //     CTR: item.clicks / item.impressions,
  //     status: 'Pause',
  //     type: 'Display',
  //   };
  //   return newObj;
  // });

  const [indexSelected, setIndexSelected] = useState(0);

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
      data: tableData,
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
      boardData[3].data = tableData;
    }
    setboardData({ ...boardData });
  }, [stackedAreaChart, tableData]);

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
