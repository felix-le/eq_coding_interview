import React, { useState, useRef } from 'react';
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';

const MapChart3 = ({ data }) => {
  // init setup

  const [viewport, setViewport] = useState({
    lattitude: 43.653225,
    longtitude: -79.383186,
    width: '100vw',
    height: '100vh',
    zoom: 12,
  });

  const mapRef = useRef();

  // Load data
  console.log('🚀 ~ file: MapChart2.js ~ line 8 ~ MapChart ~ data', data);
  // const optMetrics = [
  //   'impressions',
  //   'clicks',
  //   'revenue',
  //   'CTR',
  //   'avgCPC',
  //   'avgCPV',
  // ];

  return (
    <ReactMapGL
      {...viewport}
      maxZoom={20}
      mapboxApiAccessToken={
        'pk.eyJ1IjoiZmVsaXhsZSIsImEiOiJja21kd2xha2EwcXA2MnVuOGN5NXg5dWlhIn0.EjtGCEHnFnuYzwnSg5oEzA'
      }
    ></ReactMapGL>
  );
};

export default MapChart3;
