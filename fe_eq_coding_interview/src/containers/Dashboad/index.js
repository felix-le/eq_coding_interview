import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { combineFn } from '../../helpers/';
// Get functions from slices
import { getEHourly, getEDaily } from '../../store/slices/events';
import { getSHourly, getSDaily } from '../../store/slices/stats';
import { getPoi } from '../../store/slices/poi';
import { updateFormalData } from '../../store/slices/formatData';
// Import components
import DashboardData from './DashboardData';

const mapState = (state) => ({
  eDaily: state.eventSlice.eDailyApi,
  eHourly: state.eventSlice.eHourlyApi,
  poi: state.poiSlice.poiApi,
  sDaily: state.statsSlice.sDailyApi,
  sHourly: state.statsSlice.sHourlyApi,
});

const Dashboard = ({ eDaily, eHourly, poi, sDaily, sHourly }) => {
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    function combineArr() {
      const poiShourly = combineFn(poi, sHourly, 'poi_id');
      const pShSd = combineFn(poiShourly, sDaily, 'revenue');
      const pShSdEd = combineFn(pShSd, eDaily, 'date');
      const final = combineFn(pShSdEd, eHourly, 'events');

      // CTR, avgCPC, avgCPV must be string for table
      const newObj = final.map((item) => {
        const newObj2 = {
          ...item,
          CTR: ((item.clicks / item.impressions) * 100).toFixed(2),
          Status: 'Pause',
          Type: 'Display',
          AvgCPC: (item.revenue / item.clicks).toFixed(2),
          AvgCPV: ((item.revenue / item.impressions) * 1000).toFixed(2),
        };
        return newObj2;
      });

      // CTR, avgCPC, avgCPV must be Number for Map Chart
      const numberObj = newObj.map((item) => {
        const newNumberObj = {
          ...item,
          CTR: Number(item.CTR),
          AvgCPC: Number(item.AvgCPC),
          AvgCPV: Number(item.AvgCPV),
        };
        return newNumberObj;
      });
      console.log(
        '🚀 ~ file: index.js ~ line 56 ~ numberObj ~ numberObj',
        numberObj
      );

      // dispatch(updateFormalData(numberObj));
      setTableData(newObj);
    }
    combineArr();
  }, [eDaily, eHourly, poi, sDaily, sHourly]);

  useEffect(() => {
    dispatch(getEHourly());
    dispatch(getEDaily());
    dispatch(getPoi());
    dispatch(getSHourly());
    dispatch(getSDaily());
  }, [dispatch]);
  return <DashboardData stackedAreaChart={eHourly} tableData={tableData} />;
};

export default connect(mapState, null)(Dashboard);
