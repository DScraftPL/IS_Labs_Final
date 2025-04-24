import { useState } from "react";

import DatePicker from "../components/pickers/datepicker";
import TransportBarChart from "../components/charts/transportbarchart";
import ChartDataPicker from "../components/pickers/chartdatapicker";
import InfectedBarChart from "../components/charts/infectedbarchart";

const Home = () => {
  const [startDate, setStartDate] = useState('2020')
  const [endDate, setEndDate] = useState('2021')
  const [transportChartData, setTransportChartData] = useState("usAirlineTrafficDomesticSeasonallyAdjusted")
  const [infectedChartData, setInfectedChartData] = useState("newCases")
  const [currentChart, setCurrentChart] = useState("transport")

  return (
    <div className="flex flex-row w-full space-x-8">
      <div className="flex flex-col items-start space-y-4 border-2 rounded-lg p-4 ml-20">
        <div className="w-full flex flex-row space-x-4 border-2 border-gray-300 rounded-lg p-4 place-content-between">
          <DatePicker
            name="start"
            value={startDate}
            setValue={setStartDate}
          />
          <button onClick={() => {
            setCurrentChart(currentChart === "transport" ? "infected" : "transport")
          }}>
            Toggle
          </button>
          <DatePicker
            name="end"
            value={endDate}
            setValue={setEndDate}
          />
        </div>
        <ChartDataPicker
          selected={currentChart === "transport" ? transportChartData : infectedChartData}
          setSelected={currentChart === "transport" ? setTransportChartData : setInfectedChartData}
          dataSource={currentChart}
        />
      </div>
      <div className="flex-grow border-2 rounded-lg p-4 mr-20">
        {currentChart === "transport" ? (
          <TransportBarChart
            title="Transportation Data"
            startDate={startDate}
            endDate={endDate}
            type={transportChartData}
          />
        ) : (
          <InfectedBarChart
            startDate={startDate}
            endDate={endDate}
            type={infectedChartData}
          />
        )}
      </div>
    </div>
  )
}

export default Home;