import { useState } from "react";

import DatePicker from "../components/datepicker";
import SimpleBarChart from "../components/simplebarchart";
import ChartDataPicker from "../components/chartdatapicker";

const Home = () => {
    const [startDate, setStartDate] = useState('2019')
    const [endDate, setEndDate] = useState('2020')
    const [chartData, setChartData] = useState("usAirlineTrafficDomesticSeasonallyAdjusted")

    return (
        <>
            <h1>Home</h1>
            <SimpleBarChart
                title="hello world"
                startDate={startDate}
                endDate={endDate} 
                type={chartData}
            />
            <DatePicker 
                name="start" 
                value={startDate} 
                setValue={setStartDate}
            />
            <DatePicker 
                name="end" 
                value={endDate}
                setValue={setEndDate}
            />
            <ChartDataPicker 
                selected={chartData}
                setSelected={setChartData}
            />
        </>
    )
}

export default Home;