const mapTransportationData = (data: any) => {
    return {
        date: data['Date'],
        usAirlineTrafficTotalSeasonallyAdjusted: data['U.S. Airline Traffic - Total - Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - Total - Seasonally Adjusted']) : null,
        usAirlineTrafficInternationalSeasonallyAdjusted: data['U.S. Airline Traffic - International - Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - International - Seasonally Adjusted']) : null,
        usAirlineTrafficDomesticSeasonallyAdjusted: data['U.S. Airline Traffic - Domestic - Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - Domestic - Seasonally Adjusted']) : null,
        transitRidershipOtherTransitModesAdjusted: data['Transit Ridership - Other Transit Modes - Adjusted'] ? parseFloat(data['Transit Ridership - Other Transit Modes - Adjusted']) : null,
        transitRidershipFixedRouteBusAdjusted: data['Transit Ridership - Fixed Route Bus - Adjusted'] ? parseFloat(data['Transit Ridership - Fixed Route Bus - Adjusted']) : null,
        transitRidershipUrbanRailAdjusted: data['Transit Ridership - Urban Rail - Adjusted'] ? parseFloat(data['Transit Ridership - Urban Rail - Adjusted']) : null,
        highwayVehicleMilesTraveledAllSystems: data['Highway Vehicle Miles Traveled - All Systems'] ? parseFloat(data['Highway Vehicle Miles Traveled - All Systems']) : null,
        highwayVehicleMilesTraveledTotalRural: data['Highway Vehicle Miles Traveled - Total Rural'] ? parseFloat(data['Highway Vehicle Miles Traveled - Total Rural']) : null,
        highwayVehicleMilesTraveledOtherRural: data['Highway Vehicle Miles Traveled - Other Rural'] ? parseFloat(data['Highway Vehicle Miles Traveled - Other Rural']) : null,
        highwayVehicleMilesTraveledRuralOtherArterial: data['Highway Vehicle Miles Traveled - Rural Other Arterial'] ? parseFloat(data['Highway Vehicle Miles Traveled - Rural Other Arterial']) : null,
        highwayVehicleMilesTraveledRuralInterstate: data['Highway Vehicle Miles Traveled - Rural Interstate'] ? parseFloat(data['Highway Vehicle Miles Traveled - Rural Interstate']) : null,
        passengerRailPassengers: data['Passenger Rail Passengers'] ? parseFloat(data['Passenger Rail Passengers']) : null,
        passengerRailMiles: data['Passenger Rail Passenger Miles'] ? parseFloat(data['Passenger Rail Passenger Miles']) : null,
        passengerRailTrainMiles: data['Passenger Rail Total Train Miles'] ? parseFloat(data['Passenger Rail Total Train Miles']) : null,
        passengerRailTotalReports: data['Passenger Rail Total Reports'] ? parseFloat(data['Passenger Rail Total Reports']) : null,
        usCanadaIncomingPersons: data['U.S.-Canada Incoming Person Crossings'] ? parseFloat(data['U.S.-Canada Incoming Person Crossings']) : null,
        usMexicoIncomingPersons: data['U.S.-Mexico Incoming Person Crossings'] ? parseFloat(data['U.S.-Mexico Incoming Person Crossings']) : null,
        airSafetyAirTaxiCommuterFatalities: data['Air Safety - Air Taxi and Commuter Fatalities'] ? parseFloat(data['Air Safety - Air Taxi and Commuter Fatalities']) : null,
        usAirlineTrafficTotalNonSeasonallyAdjusted: data['U.S. Airline Traffic - Total - Non Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - Total - Non Seasonally Adjusted']) : null,
        usAirlineTrafficInternationalNonSeasonallyAdjusted: data['U.S. Airline Traffic - International - Non Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - International - Non Seasonally Adjusted']) : null,
        usAirlineTrafficDomesticNonSeasonallyAdjusted: data['U.S. Airline Traffic - Domestic - Non Seasonally Adjusted'] ? parseFloat(data['U.S. Airline Traffic - Domestic - Non Seasonally Adjusted']) : null
    }
}

export default mapTransportationData