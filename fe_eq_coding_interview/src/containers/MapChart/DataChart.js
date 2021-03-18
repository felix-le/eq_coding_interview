import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// import {updateFormalData} from '../../store/slices/formatData'
const mapState = (state) => state;

const DataChart = (state) => {
  let newState = state;
  console.log(
    '🚀 ~ file: DataChart.js ~ line 9 ~ DataChart ~ newState',
    newState
  );

  return <>Hello</>;
};

export default connect(mapState, null)(DataChart);
