import { useState, useEffect } from 'react';
import TableDataComponent from '../TableData';
import ChartStackedArea from '../ChartStackedArea';
import 'carbon-components/css/carbon-components.min.css';
import '@carbon/charts/styles.css';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
} from 'carbon-components-react/lib/components/UIShell';
import MapChart from '../MapChart';

const headerDataTable = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'Status',
    header: 'Status',
  },
  {
    key: 'CTR',
    header: 'CTR (%)',
  },
  {
    key: 'Type',
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
    key: 'AvgCPC',
    header: 'AvgCPC',
  },
  {
    key: 'AvgCPV',
    header: 'AvgCPV',
  },
  {
    key: 'revenue',
    header: 'Revenue (B)',
  },
];
const DashboardData = ({ stackedAreaChart, tableData, mapChartData }) => {
  console.log(
    '🚀 ~ file: DashboardData.js ~ line 57 ~ DashboardData ~ tableData',
    tableData
  );
  const [newTableData, setNewTableData] = useState([]);

  const optionStackedAreaChart = {
    axes: {
      bottom: { scaleType: 'time', mapsTo: 'date', title: 'Date' },
      left: {
        mapsTo: 'events',
        scaleType: 'linear',
        stacked: true,
        title: 'Events',
      },
    },
    curve: 'curveMonotoneX',
    title: 'Number events/days',
    height: '300px',
  };

  useEffect(() => {
    if (tableData.length > 0) {
      let formatDatatable = tableData.map((item) => {
        const newObj = { ...item, id: item.poi_id.toString() };
        return newObj;
      });
      setNewTableData(formatDatatable);
    }
  }, [tableData]);

  return (
    <>
      <Header aria-label='Felix Le'>
        <HeaderName href='/' prefix='Felix Le'>
          EQ Works - Work Sample
        </HeaderName>
        <HeaderNavigation aria-label='Felix Le'>
          <HeaderMenuItem href='/#Dashboard'>Dashboard</HeaderMenuItem>
          <HeaderMenuItem href='/#mapchart'>DataChart</HeaderMenuItem>
        </HeaderNavigation>
      </Header>
      <div style={{ marginTop: '200px' }} id='two_charts'>
        <div className='chartStacked_wrapper'>
          <ChartStackedArea
            data={stackedAreaChart}
            options={optionStackedAreaChart}
          />
        </div>
        <div className='dataTable_wrapper'>
          {newTableData.length > 0 && (
            <TableDataComponent
              rowData={newTableData}
              headerData={headerDataTable}
            />
          )}
        </div>
      </div>
      <div className='opt_poi__wrapper' id='mapChart'>
        <MapChart data={mapChartData} />
      </div>
    </>
  );
};

export default DashboardData;
