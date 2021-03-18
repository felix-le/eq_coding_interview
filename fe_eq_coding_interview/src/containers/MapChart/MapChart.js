import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { FaBuilding } from 'react-icons/fa';
import useSupercluster from 'use-supercluster';
const Marker = ({ children }) => children;

const MapChart = ({ data }) => {
  const mapRef = useRef();
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState({
    ne: {
      lat: 43.72994718039476,
      lng: -78.9478252928626,
    },
    nw: {
      lat: 43.72994718039476,
      lng: -79.79960904530401,
    },
    se: {
      lat: 43.55926889307838,
      lng: -78.9478252928626,
    },
    sw: {
      lat: 43.55926889307838,
      lng: -79.79960904530401,
    },
  });
  const [dataMap, setDataMap] = useState([]);

  const [metric, setMetric] = useState('impressions');
  // Set
  const optMetrics = [
    'Impressions',
    'Clicks',
    'Revenue',
    'CTR',
    'AvgCPC',
    'AvgCPV',
  ];
  function _handlePoiSelected(e) {
    const value = e.target.value;
    if (value === 'Impressions' || value === 'Clicks' || value === 'Revenue') {
      setMetric(value.toLowerCase());
    } else {
      setMetric(value);
    }
  }

  // load and format data
  function formatData(inputData) {
    let data = [...inputData];
    let newFormatData = [];
    if (data.length > 0) {
      data.forEach((item) => {
        const newData = {
          ...item,
          type: 'Place',
          properties: {
            category: item.Type,
            cluster: false,
            name: item.name,
          },
          geometry: { type: 'Point', coordinates: [item.lon, item.lat] },
        };
        newFormatData.push(newData);
      });
    }
    return newFormatData;
  }
  useEffect(() => {
    setDataMap(formatData(data));
  }, [data]);

  // get clusters
  const { clusters, supercluster } = useSupercluster({
    points: dataMap,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  const _handlerZoomBounds = (zoom, bounds) => {
    setZoom(zoom);
    setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
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
        <div className='inputZoom__wrapper'>
          <p>Zoom Level: &#32; </p>
          <p className='box_zoom'> &#32; {zoom}</p>
        </div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPBOX_TOKEN }}
        defaultCenter={{ lat: 43.653225, lng: -79.383186 }}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => _handlerZoomBounds(zoom, bounds)}
      >
        {clusters.map((cluster) => {
          const [longtitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count } = cluster.properties;

          if (isCluster) {
            return (
              <Marker key={cluster.id} lat={latitude} lng={longtitude}>
                <div
                  className='cluster-marker'
                  style={{
                    width: `${20 + (point_count / dataMap.length) * 40}px`,
                    height: `${20 + (point_count / dataMap.length) * 40}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id)
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longtitude });
                  }}
                >
                  {point_count}
                </div>
              </Marker>
            );
          }
          return (
            <Marker key={cluster.poi_id} lat={latitude} lng={longtitude}>
              <div className='icon-wrapper'>
                <FaBuilding />
              </div>
              <div className='text-icon-wrapper'>
                {cluster.name && <p className='cluster_name'>{cluster.name}</p>}
                {Object.keys(cluster).length > 0 && (
                  <p className='metric_value'>{cluster[metric]}</p>
                )}
              </div>
            </Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default MapChart;
