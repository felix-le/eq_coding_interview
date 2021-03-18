import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { FaBuilding } from 'react-icons/fa';
import useSupercluster from 'use-supercluster';
const Marker = ({ children }) => children;

const MapChart3 = ({ data }) => {
  const mapRef = useRef();
  const [zoom, setZoom] = useState(10);
  console.log('🚀 ~ file: MapChart3.js ~ line 10 ~ MapChart3 ~ zoom', zoom);
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

  // load and format data
  function formatData(inputData) {
    let data = [...inputData];
    let newFormatData = [];
    if (data.length > 0) {
      data.map((item) => {
        const newData = {
          ...item,
          type: 'Place',
          properties: {
            category: item.Type,
            cluster: false,
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

  console.log(
    '🚀 ~ file: MapChart3.js ~ line 40 ~ MapChart3 ~ clusters',
    clusters
  );
  const _handlerZoomBounds = (zoom, bounds) => {
    setZoom(zoom);
    setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
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
          const {
            cluster: isCluster,
            point_count: point_count,
          } = cluster.properties;

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
            </Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default MapChart3;
