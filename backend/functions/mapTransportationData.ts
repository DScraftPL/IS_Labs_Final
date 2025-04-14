const mapTransportationData = (data: any) => {
    return {
        date: data['Date'],
        usAirlineTrafficTotalSeasonallyAdjusted: data['U.S. Airline Traffic - Total - Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - Total - Seasonally Adjusted']) : 0,
        usAirlineTrafficInternationalSeasonallyAdjusted: data['U.S. Airline Traffic - International - Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - International - Seasonally Adjusted']) : 0,
        usAirlineTrafficDomesticSeasonallyAdjusted: data['U.S. Airline Traffic - Domestic - Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - Domestic - Seasonally Adjusted']) : 0,
        transitRidershipOtherTransitModesAdjusted: data['Transit Ridership - Other Transit Modes - Adjusted'] ? parseFloat(data['Transit Ridership - Other Transit Modes - Adjusted']) : 0,
        transitRidershipFixedRouteBusAdjusted: data['Transit Ridership - Fixed Route Bus - Adjusted'] ? parseFloat(data['Transit Ridership - Fixed Route Bus - Adjusted']) : 0,
        transitRidershipUrbanRailAdjusted: data['Transit Ridership - Urban Rail - Adjusted'] ? parseFloat(data['Transit Ridership - Urban Rail - Adjusted']) : 0,
        highwayVehicleMilesTraveledAllSystems: data['Highway Vehicle Miles Traveled - All Systems'] ? parseFloat(data['Highway Vehicle Miles Traveled - All Systems']) : 0,
        highwayVehicleMilesTraveledTotalRural: data['Highway Vehicle Miles Traveled - Total Rural'] ? parseFloat(data['Highway Vehicle Miles Traveled - Total Rural']) : 0,
        highwayVehicleMilesTraveledOtherRural: data['Highway Vehicle Miles Traveled - Other Rural'] ? parseFloat(data['Highway Vehicle Miles Traveled - Other Rural']) : 0,
        highwayVehicleMilesTraveledRuralOtherArterial: data['Highway Vehicle Miles Traveled - Rural Other Arterial'] ? parseFloat(data['Highway Vehicle Miles Traveled - Rural Other Arterial']) : 0,
        highwayVehicleMilesTraveledRuralInterstate: data['Highway Vehicle Miles Traveled - Rural Interstate'] ? parseFloat(data['Highway Vehicle Miles Traveled - Rural Interstate']) : 0,
        passengerRailPassengers: data['Passenger Rail Passengers'] ? parseFloat(data['Passenger Rail Passengers']) : 0,
        passengerRailMiles: data['Passenger Rail Passenger Miles'] ? parseFloat(data['Passenger Rail Passenger Miles']) : 0,
        passengerRailTrainMiles: data['Passenger Rail Total Train Miles'] ? parseFloat(data['Passenger Rail Total Train Miles']) : 0,
        passengerRailTotalReports: data['Passenger Rail Total Reports'] ? parseFloat(data['Passenger Rail Total Reports']) : 0,
        usCanadaIncomingPersons: data['U.S.-Canada Incoming Person Crossings'] ? parseFloat(data['U.S.-Canada Incoming Person Crossings']) : 0,
        usMexicoIncomingPersons: data['U.S.-Mexico Incoming Person Crossings'] ? parseFloat(data['U.S.-Mexico Incoming Person Crossings']) : 0,
        airSafetyAirTaxiCommuterFatalities: data['Air Safety - Air Taxi and Commuter Fatalities'] ? parseFloat(data['Air Safety - Air Taxi and Commuter Fatalities']) : 0,
        usAirlineTrafficTotalNonSeasonallyAdjusted: data['U.S. Airline Traffic - Total - Non Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - Total - Non Seasonally Adjusted']) : 0,
        usAirlineTrafficInternationalNonSeasonallyAdjusted: data['U.S. Airline Traffic - International - Non Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - International - Non Seasonally Adjusted']) : 0,
        usAirlineTrafficDomesticNonSeasonallyAdjusted: data['U.S. Airline Traffic - Domestic - Non Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - Domestic - Non Seasonally Adjusted']) : 0
    }
}

export default mapTransportationData