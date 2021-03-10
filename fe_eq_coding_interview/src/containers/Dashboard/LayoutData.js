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
const LayoutData = ({ stackedAreaChart, tableData }) => {
  const optionCharts = [
    {
      id: 123,
      type: 'stackedArea',
      option: {
        axes: {
          bottom: { scaleType: 'time', mapsTo: 'date' },
          left: { mapsTo: 'impressions' },
          curve: 'curveMonotoneX',
          height: '100%',
          title: 'Stacked area (time series)',
        },
      },
    },
    {
      id: 456,
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
      type: 'line',
    },
  ];

  return <>this is layoutData</>;
};

export default LayoutData;
