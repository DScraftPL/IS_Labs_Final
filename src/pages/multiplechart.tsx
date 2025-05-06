import { useState } from "react"

import ChartDataPicker from "../components/pickers/chartdatapicker"
import MultipleBarChart from "../components/charts/multiplechart"
import DatePicker from "../components/pickers/datepicker"

const MultipleChart = () => {
  const [startDate, setStartDate] = useState('2020')
  const [endDate, setEndDate] = useState('2021')
  const [transportChartData, setTransportChartData] = useState("usAirlineTrafficDomesticSeasonallyAdjusted")
  const [infectedChartData, setInfectedChartData] = useState("newCases")

  return (
    <div className="flex flex-grow px-20 mx-20 w-full">
      <div className="flex border-2 rounded-lg p-4 w-full">
        <div className="flex flex-col space-y-4">
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
            selected={transportChartData}
            setSelected={setTransportChartData}
            dataSource={"transport"}
          />
          <ChartDataPicker
            selected={infectedChartData}
            setSelected={setInfectedChartData}
            dataSource={"infected"}
          />
        </div>
        <MultipleBarChart
          startDate={startDate}
          endDate={endDate}
          typeTransport={transportChartData}
          typeInfected={infectedChartData}
        />
      </div>
    </div>
  )
}

export default MultipleChart;