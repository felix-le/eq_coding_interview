import { SimpleBarChart } from '@carbon/charts-react';

const BarChart = ({ data, options }, key) => {
  return (
    <div className='chartCarbon'>
      <SimpleBarChart data={data} options={options} key={key} />
    </div>
  );
};

export default BarChart;
