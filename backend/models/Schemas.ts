import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transportationDataSchema = new Schema({
  date: String,
  usAirlineTrafficTotalSeasonallyAdjusted: Number,
  usAirlineTrafficInternationalSeasonallyAdjusted: Number,
  usAirlineTrafficDomesticSeasonallyAdjusted: Number,
  transitRidershipOtherTransitModesAdjusted: Number,
  transitRidershipFixedRouteBusAdjusted: Number,
  transitRidershipUrbanRailAdjusted: Number,
  highwayVehicleMilesTraveledAllSystems: Number,
  highwayVehicleMilesTraveledTotalRural: Number,
  highwayVehicleMilesTraveledOtherRural: Number,
  highwayVehicleMilesTraveledRuralOtherArterial: Number,
  highwayVehicleMilesTraveledRuralInterstate: Number,
  passengerRailPassengers: Number,
  passengerRailMiles: Number,
  passengerRailTrainMiles: Number,
  passengerRailTotalReports: Number,
  usCanadaIncomingPersons: Number,
  usMexicoIncomingPersons: Number,
  airSafetyAirTaxiCommuterFatalities: Number,
  usAirlineTrafficTotalNonSeasonallyAdjusted: Number,
  usAirlineTrafficInternationalNonSeasonallyAdjusted: Number,
  usAirlineTrafficDomesticNonSeasonallyAdjusted: Number,
}, { timestamps: true });

const whoDataSchema = new Schema({
  dateReported: String,
  countryCode: String,
  country: String,
  whoRegion: String,
  newCases: Number,
  cumulativeCases: Number,
  newDeaths: Number,
  cumulativeDeaths: Number
}, { timestamps: true });

const TransportationDataModel = mongoose.model('TransportationData', transportationDataSchema);
const WHODataModel = mongoose.model('WHOData', whoDataSchema);

export default {
    TransportationDataModel,
    WHODataModel,
    transportationDataSchema
}