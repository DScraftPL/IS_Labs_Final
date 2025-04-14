import { useState } from "react";

import DatePicker from "../components/datepicker";
import TransportBarChart from "../components/transportbarchart";
import ChartDataPicker from "../components/chartdatapicker";

const Home = () => {
  const [startDate, setStartDate] = useState('2019')
  const [endDate, setEndDate] = useState('2020')
  const [chartData, setChartData] = useState("usAirlineTrafficDomesticSeasonallyAdjusted")

  return (
    <div className="flex flex-row w-full space-x-8">
      <div className="flex flex-col items-start space-y-4 border-2 rounded-lg p-4 ml-20">
        <div className="w-full flex flex-row space-x-4 border-2 border-gray-300 rounded-lg p-4 place-content-between">
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
        </div>
        <ChartDataPicker
          selected={chartData}
          setSelected={setChartData}
        />
      </div>
      <div className="flex-grow border-2 rounded-lg p-4 mr-20">
        <TransportBarChart
          title="Transportation Data"
          startDate={startDate}
          endDate={endDate}
          type={chartData}
        />
      </div>
    </div>
  )
}

export default Home;