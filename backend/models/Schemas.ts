import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const TransportationDataModel = mongoose.model('TransportationData', transportationDataSchema);
const WHODataModel = mongoose.model('WHOData', whoDataSchema);
const UserModel = mongoose.model<IUser>('UserData', userSchema);

export default {
  TransportationDataModel,
  WHODataModel,
  UserModel
}