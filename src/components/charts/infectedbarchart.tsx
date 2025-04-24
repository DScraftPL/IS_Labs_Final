import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useInfectedData from "../../hooks/useInfectedData";

Chart.register(...registerables);

export default function InfectedBarChart(props: {
  startDate: string;
  endDate: string;
  type: string
}) {

  const { data, loading } = useInfectedData({
    startDate: props.startDate,
    endDate: props.endDate,
    type: props.type,
  });

  // if (props.startDate === "2019")
  //   return (
  //     <div className="w-full h-full flex items-center justify-center">
  //       <p>Data not available for 2019. Choose another start date.</p>
  //     </div>
  //   );

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
    <div className="w-full h-full flex items-center justify-center">
      <Bar data={data} />
    </div>
  );
}
