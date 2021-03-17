// import { useState } from 'react';
import MapChart from './MapChart';

const LayoutData = ({ dataBoard3 }) => {
  return (
    <div style={{ marginTop: '200px' }}>
      <div className='opt_poi__wrapper'>
        <MapChart data={dataBoard3} />
      </div>
    </div>
  );
};

export default LayoutData;
