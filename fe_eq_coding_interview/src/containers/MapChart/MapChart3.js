import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { FaBuilding } from 'react-icons/fa';
import useSupercluster from 'use-supercluster';
const Marker = ({ children }) => children;

const MapChart3 = ({ data }) => {
  const mapRef = useRef();
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState(null);

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
            category: item.type,
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
  const { clusters } = useSupercluster({
    points: dataMap,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });
  console.log(
    '🚀 ~ file: MapChart3.js ~ line 40 ~ MapChart3 ~ clusters',
    clusters
  );

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
        onChange={({ zoom, bounds }) => {
          console.log(
            '🚀 ~ file: MapChart3.js ~ line 73 ~ MapChart3 ~  zoom, bounds',
            zoom,
            bounds
          );

          // if (zoom !== undefined && bounds !== undefined) {
          // }
          // setZoom(zoom);
          // setBounds([
          //   bounds.nw.lng,
          //   bounds.se.lat,
          //   bounds.set.lng,
          //   bounds.nw.lat,
          // ]);
        }}
      >
        {data.length > 0 &&
          data.map((p) => (
            <Marker key={p.poi_id} lat={p.lat} lng={p.lon}>
              <div className='icon-wrapper'>
                <FaBuilding />
              </div>
            </Marker>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapChart3;
