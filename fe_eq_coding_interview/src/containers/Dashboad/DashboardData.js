import { useState, useEffect } from 'react';
import TableDataComponent from '../TableData';
import ChartStackedArea from '../ChartStackedArea';
import 'carbon-components/css/carbon-components.min.css';
import '@carbon/charts/styles.css';
import { Button } from 'carbon-components-react';
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
    header: 'Revenue (B)',
  },
];
const DashboardData = ({ stackedAreaChart, tableData }) => {
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
    <div style={{ marginTop: '200px' }}>
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

      <div className='opt_poi__wrapper'>
        <h3 className='title'>Please click for viewing Map Chart</h3>
        <Button href='/mapchart'>Show Map Chart</Button>
      </div>
    </div>
  );
};

export default DashboardData;
