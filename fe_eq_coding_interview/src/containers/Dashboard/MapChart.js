import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps';
import styled from 'styled-components';
import _ from 'lodash';
import poi from '../../store/poi';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const ChartMapContentWrapper = styled.div`
  width: 100%;
  max-height: 600px;
`;

const ComposableMapWrapper = styled(ComposableMap)`
  width: 100%;
  max-height: 600px;
`;

const MapChart = ({ data }) => {
  const defaultPosition = {
    coordinates: [-80000, 43.6708],
    zoom: 10,
  };
  const [position, setPosition] = useState(defaultPosition);
  console.log(
    '🚀 ~ file: MapChart.js ~ line 32 ~ MapChart ~ position',
    position
  );
  const [dataGeo, setDataGeo] = useState();

  // sort

  const optMetrics = [
    'impressions',
    'clicks',
    'revenue',
    'CTR',
    'avgCPC',
    'avgCPV',
  ];
  function chartData(inputData, arValue) {
    const newData = _.sortBy(inputData, arValue);

    let newR = 0.2;
    const addRData = newData.map((poi, i) => {
      return {
        ...poi,
        r: (newR += 0.1),
      };
    });
    return addRData;
  }

  function _handlePoiSelected(e) {
    const { value } = e.target;
    const arrangeArr = chartData(data, value);
    setDataGeo(arrangeArr);
  }

  useEffect(() => {
    setDataGeo(chartData(data, 'impressions'));
  }, [data]);

  // end
  function handleZoomIn() {
    if (position.zoom >= 100) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  return (
    <div className='c-chartMap'>
      <div className='select-container'>
        <select
          className='selected_pois'
          onChange={(e) => _handlePoiSelected(e)}
        >
          {optMetrics.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {data.length > 0 && (
        <ChartMapContentWrapper>
          <ComposableMapWrapper>
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMoveEnd}
              maxZoom={100}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: '#ECEFF1',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        hover: {
                          fill: '#CFD8DC',
                          stroke: '#607D8B',
                          strokeWidth: 1,
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#FF5722',
                          stroke: '#607D8B',
                          strokeWidth: 1,
                          outline: 'none',
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
              {dataGeo.map((geo, i) => (
                <Marker coordinates={[`${geo.lon}`, `${geo.lat}`]} key={i}>
                  <g
                    fill='none'
                    stroke='#FF5533'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <circle
                      r={geo.r}
                      fill='#F53'
                      stroke='#F53'
                      strokeWidth={2}
                    />
                  </g>

                  <text
                    textAnchor='middle'
                    style={{ fill: '#5D5A6D', fontSize: '1px' }}
                    y='-3'
                  >
                    {geo.name}
                  </text>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMapWrapper>
          <div className='controls'>
            <button onClick={handleZoomIn}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='3'
              >
                <line x1='12' y1='5' x2='12' y2='19' />
                <line x1='5' y1='12' x2='19' y2='12' />
              </svg>
            </button>
            <button onClick={handleZoomOut}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='3'
              >
                <line x1='5' y1='12' x2='19' y2='12' />
              </svg>
            </button>
          </div>
        </ChartMapContentWrapper>
      )}
    </div>
  );
};

export default MapChart;
