import "./Chart.css";
import ChartBar from "./ChartBar/ChartBar";

const Chart = ({ dataPoints }) => {
  const maxValue = Math.max(...dataPoints.map(({ value }) => value));
  const chartBarsEl = dataPoints.map(({ value, label }) => (
    <ChartBar key={label} value={value} label={label} maxValue={maxValue} />
  ));
  return <div className="chart">{chartBarsEl}</div>;
};

export default Chart;
