const mapTransportationData = (data: any) => {
    const parseNumber = (value: string | undefined) => {
        return value ? parseFloat(value.replace(/,/g, '')) : 0;
    };

    return {
        date: data['Date'],
        usAirlineTrafficTotalSeasonallyAdjusted: parseNumber(data['U.S. Airline Traffic - Total - Seasonally Adjusted']),
        usAirlineTrafficInternationalSeasonallyAdjusted: parseNumber(data['U.S. Airline Traffic - International - Seasonally Adjusted']),
        usAirlineTrafficDomesticSeasonallyAdjusted: parseNumber(data['U.S. Airline Traffic - Domestic - Seasonally Adjusted']),
        transitRidershipOtherTransitModesAdjusted: parseNumber(data['Transit Ridership - Other Transit Modes - Adjusted']),
        transitRidershipFixedRouteBusAdjusted: parseNumber(data['Transit Ridership - Fixed Route Bus - Adjusted']),
        transitRidershipUrbanRailAdjusted: parseNumber(data['Transit Ridership - Urban Rail - Adjusted']),
        highwayVehicleMilesTraveledAllSystems: parseNumber(data['Highway Vehicle Miles Traveled - All Systems']),
        highwayVehicleMilesTraveledTotalRural: parseNumber(data['Highway Vehicle Miles Traveled - Total Rural']),
        highwayVehicleMilesTraveledOtherRural: parseNumber(data['Highway Vehicle Miles Traveled - Other Rural']),
        highwayVehicleMilesTraveledRuralOtherArterial: parseNumber(data['Highway Vehicle Miles Traveled - Rural Other Arterial']),
        highwayVehicleMilesTraveledRuralInterstate: parseNumber(data['Highway Vehicle Miles Traveled - Rural Interstate']),
        passengerRailPassengers: parseNumber(data['Passenger Rail Passengers']),
        passengerRailMiles: parseNumber(data['Passenger Rail Passenger Miles']),
        passengerRailTrainMiles: parseNumber(data['Passenger Rail Total Train Miles']),
        passengerRailTotalReports: parseNumber(data['Passenger Rail Total Reports']),
        usCanadaIncomingPersons: parseNumber(data['U.S.-Canada Incoming Person Crossings']),
        usMexicoIncomingPersons: parseNumber(data['U.S.-Mexico Incoming Person Crossings']),
        airSafetyAirTaxiCommuterFatalities: parseNumber(data['Air Safety - Air Taxi and Commuter Fatalities']),
        usAirlineTrafficTotalNonSeasonallyAdjusted: parseNumber(data['U.S. Airline Traffic - Total - Non Seasonally Adjusted']),
        usAirlineTrafficInternationalNonSeasonallyAdjusted: parseNumber(data['U.S. Airline Traffic - International - Non Seasonally Adjusted']),
        usAirlineTrafficDomesticNonSeasonallyAdjusted: parseNumber(data['U.S. Airline Traffic - Domestic - Non Seasonally Adjusted'])
    };
};

export default mapTransportationData;