import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useMultipleData from "../../hooks/useMultipleData";
import ExportDataButton from "../exportdatabutton";

Chart.register(...registerables);

export default function MultipleBarChart(props: {
  startDate: string;
  endDate: string;
  typeInfected: string
  typeTransport: string;
}) {
  const { data, loading } = useMultipleData(props);

  if (props.startDate >= props.endDate)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>The start date must be earlier than the end date. Please adjust your selection.</p>
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
          <Bar data={data} options={{
            responsive: true,
            scales: {
              y: {
                type: "linear",
                position: "left",
                title: {
                  display: true,
                  text: "Scale for Dataset 0",
                },
              },
              y1: {
                type: "linear",
                position: "right",
                title: {
                  display: true,
                  text: "Scale for Dataset 1",
                },
                grid: {
                  drawOnChartArea: false, // Prevent grid lines from overlapping with y
                },
              },
            },
          }} />
        </div>
        <div className="flex flex-row mt-8 justify-center space-x-4">
          <ExportDataButton data={data} type={"xml"} />
          <ExportDataButton data={data} type={"json"} />
        </div>
      </div>
    </div>
  );
}
