import { StackedAreaChart } from '@carbon/charts-react';

const ChartStackedArea = ({ data, options }) => {
  return (
    <div className='chartCarbon'>
      <StackedAreaChart data={data} options={options} />
    </div>
  );
};
export default ChartStackedArea;
