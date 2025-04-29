import { useState } from "react"

import ChartDataPicker from "../components/pickers/chartdatapicker"
import MultipleBarChart from "../components/charts/multiplechart"

const MultipleChart = () => {
  const [startDate, setStartDate] = useState('2020')
  const [endDate, setEndDate] = useState('2021')
  const [transportChartData, setTransportChartData] = useState("usAirlineTrafficDomesticSeasonallyAdjusted")
  const [infectedChartData, setInfectedChartData] = useState("newCases")

  return (
    <div className="flex flex-grow px-20 mx-20 w-full">
      <div className="flex border-2 rounded-lg p-4 w-full">
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