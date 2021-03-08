import { LineChart } from '@carbon/charts-react';

const ChartLine = ({ data, options }) => {
  return (
    <div className='chartCarbon'>
      <LineChart data={data} options={options} />
    </div>
  );
};

export default ChartLine;
