import { LineChart } from '@carbon/charts-react';

const ChartLine = ({ data, options }, key) => {
  return (
    <div className='chartCarbon'>
      <LineChart data={data} options={options} key={key} />
    </div>
  );
};

export default ChartLine;
