import { StackedAreaChart } from '@carbon/charts-react';

const StackedAreaChartComponent = ({ data, options }) => {
  return (
    <div className='chartCarbon'>
      <StackedAreaChart data={data} options={options} />
    </div>
  );
};
export default StackedAreaChartComponent;
