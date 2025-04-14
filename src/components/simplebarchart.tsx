import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState, useEffect } from "react";

Chart.register(...registerables);

export default function SimpleBarChart(props: {
  title: string;
  startDate: string;
  endDate: string;
  type: string;
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/transport/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateStart: parseInt(props.startDate),
        dateEnd: parseInt(props.endDate),
        [props.type]: 1,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const labels: any = [];
        const datasets: any = [
          {
            label: props.type,
            data: [],
            borderWidth: 1,
          },
        ];
        //console.log(response)
        response.forEach((row: any) => {
          const data = row.date.split(" ")[0];
          labels.push(data);
          datasets[0].data.push(row[props.type]);
        });
        const data = {
          labels: labels,
          datasets: datasets,
        };
        setData(data);
        setLoading(false);
        //console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [props.startDate, props.endDate, props.type]);

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

  if (loading) return <p>Loading...</p>;
  if (props.startDate >= props.endDate) return <p>Pick another date...</p>;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Bar data={data} options={options} />
    </div>
  );
}
