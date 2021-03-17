import { useState, useEffect } from 'react';
import LineChartComponent from './LineChartComponent';
import TableDataComponent from './TableDataComponent';
import ChartStackedArea from './ChartStackedArea';
import 'carbon-components/css/carbon-components.min.css';
import { Button } from 'carbon-components-react';
import '@carbon/charts/styles.css';
import MapChart from './MapChart';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

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

// function find(arr) {
//   for (let i = 0; i < arr.length; i++) {
//       if (arr[i].isAstronaut) {
//           return arr[i];
//       }
//   }
//   return null;
// }

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
const LayoutData = ({ stackedAreaChart, tableData, dataBoard3 }) => {
  const [indexSelected, setIndexSelected] = useState(0);
  const [newTableData, setNewTableData] = useState([]);
  const [fullWidth, setFullWidth] = useState(false);

  // const [newChartData4, setNewChartData4] = useState([]);
  // console.log(
  //   '🚀 ~ file: LayoutData.js ~ line 83 ~ LayoutData ~ newChartData4',
  //   newChartData4
  // );

  // function _handlePoiSelected(e) {
  //   const { value } = e.target;

  //   const newPoiSelected = dataBoard3.find(
  //     (item) => item['poi_id'] === Number(value)
  //   );

  //   let newData = [];
  //   Object.keys(newPoiSelected).map((key) => {
  //     if (Number(newPoiSelected[key])) {
  //       const newObj = {
  //         group: newPoiSelected.group,
  //         key: key,
  //         value: newPoiSelected[key],
  //       };
  //       newData.push(newObj);
  //     }
  //   });
  //   setIsPoiSelected(newData);
  // }

  // useEffect(() => {
  //   if (dataBoard3.length > 0) {
  //     let newData = [];
  //     dataBoard3.map((poi) => {
  //       Object.keys(poi).map((key) => {
  //         if (Number(poi[key]) && key !== 'impressions') {
  //           const newObj = {
  //             group: poi.group,
  //             key: key,
  //             value: poi[key],
  //           };
  //           newData.push(newObj);
  //         }
  //       });
  //     });
  //     setNewChartData4(newData);
  //   }
  // }, [dataBoard3]);
  console.log(
    '🚀 ~ file: LayoutData.js ~ line 77 ~ LayoutData ~ dataBoard3',
    dataBoard3
  );

  // const options4 = {
  //   title: 'Line (discrete)',
  //   axes: {
  //     bottom: {
  //       title: 'Compare POI',
  //       mapsTo: 'key',
  //       scaleType: 'labels',
  //     },
  //     left: {
  //       mapsTo: 'value',
  //       title: 'Something rate',
  //       scaleType: 'linear',
  //     },
  //   },
  //   height: '800px',
  // };

  const optionStackedAreaChart = {
    axes: {
      bottom: { scaleType: 'time', mapsTo: 'date' },
      left: { mapsTo: 'events' },
    },
    curve: 'curveMonotoneX',
    height: '80%',
    title: 'Number events/days',
    height: '400px',
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
    height: '800px',
  };

  useEffect(() => {
    if (dataBoard3.length > 0) {
      let formatDataBoard4 = { ...dataBoard3 };
    }
  }, [dataBoard3]);

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
      <LineChartComponent
        data={dataBoard3}
        options={optionChart3}
        className='mb-5'
      />
      <div className='select-container'>
        <select
          className='selected_metric'
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
      {/* <div className='chartStacked_wrapper'>
        <ChartStackedArea
          data={stackedAreaChart}
          options={optionStackedAreaChart}
        />
      </div>

      <div className='dataTable_wrapper'>
        {newTableData.length > 0 && (
          <DataTable rowData={newTableData} headerData={headerDataTable} />
        )}
      </div> */}
      {/* 
      <div className={`${fullWidth ? 'fullWidth' : ''} opt_chart_wrapper `}>
        <div className='button__full_width__wrapper'>
          <Button kind='primary' onClick={() => setFullWidth(!fullWidth)}>
            Full width
          </Button>
        </div>
        <ChartLineContent />
      </div> */}

      <div className='opt_poi__wrapper'>
        <MapChart />
        {/* <div className='select-container'>
          <select
            className='selected_pois'
            onChange={(e) => _handlePoiSelected(e)}
          >
            {dataBoard3.map((item, i) => (
              <option key={i} value={item.poi_id}>
                {item.name}
              </option>
            ))}
          </select>
        </div> */}
        {/* {newChartData4.length > 0 && (
          <LineChartComponent data={newChartData4} options={options4} />
        )} */}
        {/* {!isPoiSelected ? (
          <div>Please select a POI first</div>
        ) : (
          <LineChartComponent data={newChartData4} options={options4} />
        )} */}
      </div>
    </div>
  );
};

export default LayoutData;
