import React from "react";

const ChartDataPicker = (
  props: {
    selected: string
    setSelected: any
  }
) => {
  const labels = [
    "US Airline Traffic (Total, Seasonally Adjusted)",
    "US Airline Traffic (International, Seasonally Adjusted)",
    "US Airline Traffic (Domestic, Seasonally Adjusted)",
    "Transit Ridership (Other Transit Modes, Adjusted)",
    "Transit Ridership (Fixed Route Bus, Adjusted)",
    "Transit Ridership (Urban Rail, Adjusted)",
    "Highway Vehicle Miles Traveled (All Systems)",
    "Highway Vehicle Miles Traveled (Total Rural)",
    "Highway Vehicle Miles Traveled (Other Rural)",
    "Highway Vehicle Miles Traveled (Rural Other Arterial)",
    "Highway Vehicle Miles Traveled (Rural Interstate)",
    "Passenger Rail (Passengers)",
    "Passenger Rail (Miles)",
    "Passenger Rail (Train Miles)",
    "Passenger Rail (Total Reports)",
    "Border Incoming Persons (US–Canada)",
    "Border Incoming Persons (US–Mexico)",
    "Air Safety (Air Taxi / Commuter Fatalities)",
    "US Airline Traffic (Total, Non-Seasonally Adjusted)",
    "US Airline Traffic (International, Non-Seasonally Adjusted)",
    "US Airline Traffic (Domestic, Non-Seasonally Adjusted)"
  ];

  const values = [
    'usAirlineTrafficTotalSeasonallyAdjusted',
    'usAirlineTrafficInternationalSeasonallyAdjusted',
    'usAirlineTrafficDomesticSeasonallyAdjusted',
    'transitRidershipOtherTransitModesAdjusted',
    'transitRidershipFixedRouteBusAdjusted',
    'transitRidershipUrbanRailAdjusted',
    'highwayVehicleMilesTraveledAllSystems',
    'highwayVehicleMilesTraveledTotalRural',
    'highwayVehicleMilesTraveledOtherRural',
    'highwayVehicleMilesTraveledRuralOtherArterial',
    'highwayVehicleMilesTraveledRuralInterstate',
    'passengerRailPassengers',
    'passengerRailMiles',
    'passengerRailTrainMiles',
    'passengerRailTotalReports',
    'usCanadaIncomingPersons',
    'usMexicoIncomingPersons',
    'airSafetyAirTaxiCommuterFatalities',
    'usAirlineTrafficTotalNonSeasonallyAdjusted',
    'usAirlineTrafficInternationalNonSeasonallyAdjusted',
    'usAirlineTrafficDomesticNonSeasonallyAdjusted'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSelected(e.target.value)
  }

  return (<>
    {labels.map((label, index) => {
      return (
        <div className="flex flex-row" key={index}>
          <input
            type="radio"
            id={values[index]} 
            name="chartdatapicker" 
            value={values[index]}
            onChange={handleChange}
            checked={props.selected === values[index]}
          />
          <label htmlFor={values[index]}>{label}</label>
        </div>
      )
    })}
  </>)

}

export default ChartDataPicker