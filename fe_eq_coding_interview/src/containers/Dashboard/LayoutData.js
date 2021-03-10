import { useState, useEffect } from 'react';
import ChartLine from './ChartLine';
import DataTable from './DataTable';
import ChartStackedArea from './ChartStackedArea';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import { ModalWrapper } from 'carbon-components-react';
const optionViews = [
  {
    label: 'Clicks/revenue (AvgCPC)',
    value: {
      bottom: { mapsTo: 'impressions' },
      left: { mapsTo: 'clicks' },
    },
  },
  {
    label: 'CTR (Clicks/Impressions)',
    value: {
      bottom: { mapsTo: 'clicks' },
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
const LayoutData = ({ stackedAreaChart, tableData, dataBoard3 }) => {
  const [indexSelected, setIndexSelected] = useState(0);
  const [newTableData, setNewTableData] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const optionStackedAreaChart = {
    axes: {
      bottom: { scaleType: 'time', mapsTo: 'date' },
      left: { mapsTo: 'events' },
    },
    curve: 'curveMonotoneX',
    height: '80%',
    title: 'Number events/days',
  };
  const optionChart3 = {
    axes: optionViews[indexSelected].value,
    curve: 'curveMonotoneX',
    height: '100%',
    title: optionViews[indexSelected].label,
    color: {
      scale: {
        'EQ Works': 'blue',
        'CN Tower': '#FF6633',
        'Niagara Falls': '#00CC00',
        'Vancouver Harbour': '#FFDC00',
      },
    },
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

  const ChartLineContent = () => (
    <>
      <ChartLine data={dataBoard3} options={optionChart3} className='mb-5' />
      <div className='select-container'>
        <select
          className='selected_matrix'
          onChange={(e) => setIndexSelected(e.target.value)}
        >
          {optionViews.map((option, i) => (
            <option key={i} value={i}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );

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
          <DataTable rowData={newTableData} headerData={headerDataTable} />
        )}
      </div>

      <div className='opt_chart_wrapper' style={{ position: 'relative' }}>
        <div className='model__wrapper'>
          <ModalWrapper
            buttonTriggerText='Full width'
            modalHeading='Full-width view'
            className='modal_fullwidth'
            size='lg'
            passiveModal
          >
            <ChartLineContent />
          </ModalWrapper>
        </div>
        <ChartLineContent />
      </div>
    </div>
  );
};

export default LayoutData;
