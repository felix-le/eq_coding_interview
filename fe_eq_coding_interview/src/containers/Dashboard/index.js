import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEHourly, getEDaily } from '../../store/events';
import { getSHourly, getSDaily } from '../../store/stats';
import { getPoi } from '../../store/poi';
import { connect } from 'react-redux';
import LayoutData from './LayoutData';
import { combineFn } from '../../helpers/';
const mapState = (state) => ({
  eDaily: state.eventSlice.eDailyApi,
  eHourly: state.eventSlice.eHourlyApi,
  poi: state.poiSlice.poiApi,
  sDaily: state.statsSlice.sDailyApi,
  sHourly: state.statsSlice.sHourlyApi,
});

const Dashboard = ({ eDaily, eHourly, poi, sDaily, sHourly }) => {
  const [tableData, setTableData] = useState([]);
  console.log(
    '🚀 ~ file: index.js ~ line 19 ~ Dashboard ~ tableData',
    tableData
  );

  const dispatch = useDispatch();

  function combineArr() {
    const poiShourly = combineFn(poi, sHourly, 'poi_id');
    const pShSd = combineFn(poiShourly, sDaily, 'revenue');
    const pShSdEd = combineFn(pShSd, eDaily, 'date');
    const final = combineFn(pShSdEd, eHourly, 'events');
    console.log('🚀 ~ file: index.js ~ line 28 ~ combineArr ~ final', final);
    const newObj = final.map((item) => {
      const newObj2 = {
        ...item,
        CTR: ((item.clicks / item.impressions) * 100).toFixed(2),
        status: 'Pause',
        type: 'Display',
        avgCPC: (item.revenue / item.clicks).toFixed(2),
        avgCPV: ((item.revenue / item.impressions) * 1000).toFixed(2),
      };
      return newObj2;
    });
    setTableData(newObj);
  }

  useEffect(() => {
    combineArr();
  }, [eDaily, eHourly, poi, sDaily, sHourly]);

  useEffect(() => {
    dispatch(getEHourly());
    dispatch(getEDaily());
    dispatch(getPoi());
    dispatch(getSHourly());
    dispatch(getSDaily());
  }, [dispatch]);
  return <LayoutData stackedAreaChart={eHourly} tableData={tableData} />;
};

export default connect(mapState, null)(Dashboard);
