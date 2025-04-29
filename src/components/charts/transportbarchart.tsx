import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useTransportData from "../../hooks/useTransportData";
import ExportDataButton from "../exportdatabutton";

Chart.register(...registerables);

export default function TransportBarChart(props: {
  title: string;
  startDate: string;
  endDate: string;
  type: string;
}) {
  const { data, loading } = useTransportData({
    startDate: props.startDate,
    endDate: props.endDate,
    type: props.type,
  });


  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  if (props.startDate >= props.endDate)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>The start date must be earlier than the end date. Please adjust your selection.</p>
      </div>
    );
  if (props.type.includes("highway") && parseInt(props.endDate) === 2023)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>No data available for highways in the year 2023. Please choose a different type or date range.</p>
      </div>
    );
  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Loading data, please wait...</p>
      </div>
    );

  return (
    <div className="flex flex-grow w-full justify-center items-center">
      <div className="flex flex-col rounded-lg w-full max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <Bar data={data} options={options} />
        </div>
        <div className="flex flex-row mt-8 justify-center space-x-4">
          <ExportDataButton data={data} type={"xml"} />
          <ExportDataButton data={data} type={"json"} />
        </div>
      </div>
    </div>
  );
}
