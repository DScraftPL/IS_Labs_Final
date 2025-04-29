import models from "../models/Schemas"
import replaceNullWithZero from "../functions/replacenullwithzero"
import { Request, Response } from "express"

const get = async (req: Request, res: Response) => {
    const query = models.TransportationDataModel.find({})
    query.select('')
    const data = await query.exec()
    const temp = data.filter((row: any) => {
        let czas = Date.parse(row.date)
        return czas > Date.parse("2019")
    })
    const filtered = temp.map((row) => {
        const plainRow = row.toObject ? row.toObject() : row;
        const { _id, __v, createdAt, updatedAt, ...cleanedRow } = plainRow;
        return replaceNullWithZero(cleanedRow)
    })

    res.send(filtered)
}

const post = async (req: Request, res: Response) => {
    const query = models.TransportationDataModel.find({})
    query.select('')
    const data = await query.exec()

    const wyborMin = Date.parse(req.body.dateStart) - 86400000 // -1 day
    const wyborMax = Date.parse(req.body.dateEnd) - 86400000 // -1 day

    const usAirlineTrafficTotalSeasonallyAdjusted = req.body.usAirlineTrafficTotalSeasonallyAdjusted | 0;
    const usAirlineTrafficInternationalSeasonallyAdjusted = req.body.usAirlineTrafficInternationalSeasonallyAdjusted | 0;
    const usAirlineTrafficDomesticSeasonallyAdjusted = req.body.usAirlineTrafficDomesticSeasonallyAdjusted | 0;
    const transitRidershipOtherTransitModesAdjusted = req.body.transitRidershipOtherTransitModesAdjusted | 0;
    const transitRidershipFixedRouteBusAdjusted = req.body.transitRidershipFixedRouteBusAdjusted | 0;
    const transitRidershipUrbanRailAdjusted = req.body.transitRidershipUrbanRailAdjusted | 0;
    const highwayVehicleMilesTraveledAllSystems = req.body.highwayVehicleMilesTraveledAllSystems | 0;
    const highwayVehicleMilesTraveledTotalRural = req.body.highwayVehicleMilesTraveledTotalRural | 0;
    const highwayVehicleMilesTraveledOtherRural = req.body.highwayVehicleMilesTraveledOtherRural | 0;
    const highwayVehicleMilesTraveledRuralOtherArterial = req.body.highwayVehicleMilesTraveledRuralOtherArterial | 0;
    const highwayVehicleMilesTraveledRuralInterstate = req.body.highwayVehicleMilesTraveledRuralInterstate | 0;
    const passengerRailPassengers = req.body.passengerRailPassengers | 0;
    const passengerRailMiles = req.body.passengerRailMiles | 0;
    const passengerRailTrainMiles = req.body.passengerRailTrainMiles | 0;
    const passengerRailTotalReports = req.body.passengerRailTotalReports | 0;
    const usCanadaIncomingPersons = req.body.usCanadaIncomingPersons | 0;
    const usMexicoIncomingPersons = req.body.usMexicoIncomingPersons | 0;
    const airSafetyAirTaxiCommuterFatalities = req.body.airSafetyAirTaxiCommuterFatalities | 0;
    const usAirlineTrafficTotalNonSeasonallyAdjusted = req.body.usAirlineTrafficTotalNonSeasonallyAdjusted | 0;
    const usAirlineTrafficInternationalNonSeasonallyAdjusted = req.body.usAirlineTrafficInternationalNonSeasonallyAdjusted | 0;
    const usAirlineTrafficDomesticNonSeasonallyAdjusted = req.body.usAirlineTrafficDomesticNonSeasonallyAdjusted | 0;

    const temp = data.filter((row: any) => {
        let rok = Date.parse(row.date)
        return (rok >= wyborMin && rok <= wyborMax)
    })
    
    const filtered = temp.map((row) => {
        const plainRow = row.toObject ? row.toObject() : row;
        const { _id, __v, createdAt, updatedAt, ...cleanedRow } = plainRow;

        if (usAirlineTrafficTotalSeasonallyAdjusted == 0) {
            delete cleanedRow.usAirlineTrafficTotalSeasonallyAdjusted;
        }
        if (usAirlineTrafficInternationalSeasonallyAdjusted == 0) {
            delete cleanedRow.usAirlineTrafficInternationalSeasonallyAdjusted;
        }
        if (usAirlineTrafficDomesticSeasonallyAdjusted == 0) {
            delete cleanedRow.usAirlineTrafficDomesticSeasonallyAdjusted;
        }
        if (transitRidershipOtherTransitModesAdjusted == 0) {
            delete cleanedRow.transitRidershipOtherTransitModesAdjusted;
        }
        if (transitRidershipFixedRouteBusAdjusted == 0) {
            delete cleanedRow.transitRidershipFixedRouteBusAdjusted;
        }
        if (transitRidershipUrbanRailAdjusted == 0) {
            delete cleanedRow.transitRidershipUrbanRailAdjusted;
        }
        if (highwayVehicleMilesTraveledAllSystems == 0) {
            delete cleanedRow.highwayVehicleMilesTraveledAllSystems;
        }
        if (highwayVehicleMilesTraveledTotalRural == 0) {
            delete cleanedRow.highwayVehicleMilesTraveledTotalRural;
        }
        if (highwayVehicleMilesTraveledOtherRural == 0) {
            delete cleanedRow.highwayVehicleMilesTraveledOtherRural;
        }
        if (highwayVehicleMilesTraveledRuralOtherArterial == 0) {
            delete cleanedRow.highwayVehicleMilesTraveledRuralOtherArterial;
        }
        if (highwayVehicleMilesTraveledRuralInterstate == 0) {
            delete cleanedRow.highwayVehicleMilesTraveledRuralInterstate;
        }
        if (passengerRailPassengers == 0) {
            delete cleanedRow.passengerRailPassengers;
        }
        if (passengerRailMiles == 0) {
            delete cleanedRow.passengerRailMiles;
        }
        if (passengerRailTrainMiles == 0) {
            delete cleanedRow.passengerRailTrainMiles;
        }
        if (passengerRailTotalReports == 0) {
            delete cleanedRow.passengerRailTotalReports;
        }
        if (usCanadaIncomingPersons == 0) {
            delete cleanedRow.usCanadaIncomingPersons;
        }
        if (usMexicoIncomingPersons == 0) {
            delete cleanedRow.usMexicoIncomingPersons;
        }
        if (airSafetyAirTaxiCommuterFatalities == 0) {
            delete cleanedRow.airSafetyAirTaxiCommuterFatalities;
        }
        if (usAirlineTrafficTotalNonSeasonallyAdjusted == 0) {
            delete cleanedRow.usAirlineTrafficTotalNonSeasonallyAdjusted;
        }
        if (usAirlineTrafficInternationalNonSeasonallyAdjusted == 0) {
            delete cleanedRow.usAirlineTrafficInternationalNonSeasonallyAdjusted;
        }
        if (usAirlineTrafficDomesticNonSeasonallyAdjusted == 0) {
            delete cleanedRow.usAirlineTrafficDomesticNonSeasonallyAdjusted;
        }

        return replaceNullWithZero(cleanedRow)
    })

    res.send(filtered)
}

const getDate = async (req: Request, res: Response) => {
    const query = models.TransportationDataModel.find({})
    query.select('')
    const data = await query.exec()
    const wyborMin = Date.parse(req.params.date)
    const wyborMax = Date.parse((parseInt(req.params.date) + 1).toString())
    const temp = data.filter((row: any) => {
        let rok = Date.parse(row.date)
        return (rok > wyborMin && rok < wyborMax)
    })
    const filtered = temp.map((row) => {
        const plainRow = row.toObject ? row.toObject() : row;
        const { _id, __v, createdAt, updatedAt, ...cleanedRow } = plainRow;
        return replaceNullWithZero(cleanedRow)
    })

    res.send(filtered)
}

export default {
    get,
    post,
    getDate
}