import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useState, useEffect } from 'react';

Chart.register(...registerables);

export default function SimpleBarChart() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/transport/")
            .then((response) => response.json())
            .then((response) => {
                const labels: any = []
                const datasets : any = [{
                    label: 'usAirlineTrafficTotalSeasonallyAdjusted',
                    data: [],
                    borderWidth: 1
                }]
                response.forEach((row: any) => {
                    labels.push(row.date)
                    datasets[0].data.push(row.usAirlineTrafficTotalSeasonallyAdjusted)
                })
                const data = {
                    labels: labels,
                    datasets: datasets
                }
                setData(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    })

    const chartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Sample Data',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Simple Bar Chart Example'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    if (loading) return <p>Loading...</p>

    return (
        <div className="flex flex-col items-center w-full p-4">
            <div className="w-full max-w-xl">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

