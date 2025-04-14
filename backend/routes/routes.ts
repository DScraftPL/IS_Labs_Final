import express from "express"
import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'
import models from '../models/Schemas'
import mapTransportationData from '../functions/mapTransportationData'
import cors from 'cors'

function replaceNullWithZero(obj: any) {
    for (const key in obj) {
        if (obj[key] === null) {
            obj[key] = 0;
        }
    }
    return obj;
}

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello world!")
})

//load data into MongoDB (Transport)
app.get('/csv/transport', (req, res) => {
    const results: any[] = [];
    const csvFilePath = path.join(__dirname, 'data', 'Monthly_Transportation_Statistics_20250407.csv');

    fs.createReadStream(csvFilePath)
        .pipe(csv({
            separator: ';',
            skipLines: 0,
            skipComments: true,
        }))
        .on('data', (data: any) => {
            results.push(mapTransportationData(data));
        })
        .on('end', async () => {
            try {
                await models.TransportationDataModel.deleteMany({});
                const inserted = await models.TransportationDataModel.insertMany(results);
                res.json({
                    success: true,
                    count: results.length,
                    insertedCount: inserted.length,
                    sampleData: results[0]
                });
            } catch (dbError) {
                console.error('Database error:', dbError);
                res.status(500).send('Error saving data to database');
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV:', error);
            res.status(500).send('Error reading CSV file');
        });
});

//Load data into MongoDB (WHO)
app.get('/csv/who', (req, res) => {
    const results: any[] = [];
    const csvFilePath = path.join(__dirname, 'data', 'WHO-COVID-19-global-data.csv')
    fs.createReadStream(csvFilePath)
        .pipe(csv({
            separator: ',',
            skipComments: true,
            skipLines: 0,
            mapValues: ({ header, value }) => {
                if (['newCases', 'cumulativeCases', 'newDeaths', 'cumulativeDeaths'].includes(header)) {
                    return Number(value);
                }
                return value;
            }
        }))
        .on('data', (data: any) => {
            const mappedData = {
                dateReported: data['Date_reported'],
                countryCode: data['Country_code'],
                country: data['Country'],
                whoRegion: data['WHO_region'],
                newCases: Number(data['New_cases']),
                cumulativeCases: Number(data['Cumulative_cases']),
                newDeaths: Number(data['New_deaths']),
                cumulativeDeaths: Number(data['Cumulative_deaths'])
            };
            results.push(mappedData);
        })
        .on('end', async () => {
            try {
                await models.WHODataModel.deleteMany({});
                const inserted = await models.WHODataModel.insertMany(results);
                res.json({
                    success: true,
                    count: results.length,
                    insertedCount: inserted.length,
                    sampleData: results[0]
                });
            } catch (dbError) {
                console.error('Database error:', dbError);
                res.status(500).send('Error saving data to database');
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV:', error);
            res.status(500).send('Error reading CSV file');
        });
});

//get all relevant (USA) data from WHO
app.get('/api/who', async (req, res) => {
    const query = models.WHODataModel.find({})
    const data = await query.exec()

    const temp = data.filter((row) => row.countryCode === "US")

    const filtered = temp.map((row) => {
        const plainRow = row.toObject ? row.toObject() : row;
        const { _id, whoRegion, __v, createdAt, updatedAt, ...cleanedRow } = plainRow;
        return replaceNullWithZero(cleanedRow)
    })

    res.send(filtered)
})

//get all from given year
app.get('/api/who/date/:date', async (req, res) => {
    const query = models.WHODataModel.find({})
    const data = await query.exec()
    const wyborMin = Date.parse(req.params.date)
    const wyborMax = Date.parse((parseInt(req.params.date) + 1).toString())
    const temp = data.filter((row: any) => {
        let kraj = row.countryCode
        let rok = Date.parse(row.dateReported)
        return kraj === "US" && (rok > wyborMin && rok < wyborMax)
    })
    const filtered = temp.map((row) => {
        const plainRow = row.toObject ? row.toObject() : row;
        const { _id, whoRegion, __v, createdAt, updatedAt, ...cleanedRow } = plainRow;
        return replaceNullWithZero(cleanedRow)
    })

    res.send(filtered)
})

app.post('/api/who', async (req, res) => {
    const query = models.WHODataModel.find({})
    const data = await query.exec()

    console.log(req.body)
    const wyborMin = Date.parse(req.body.dateStart)
    const wyborMax = Date.parse(req.body.dateEnd)
    const isNewCases = req.body.newCases | 0
    const isCulminativeCases = req.body.cumulativeCases | 0
    const isNewDeaths = req.body.newDeaths | 0
    const isCulminativeDeaths = req.body.cumulativeDeaths | 0

    const temp = data.filter((row: any) => {
        let kraj = row.countryCode
        let rok = Date.parse(row.dateReported)
        return kraj === "US" && (rok > wyborMin && rok < wyborMax)
    })

    const filtered = temp.map((row) => {
        const plainRow = row.toObject ? row.toObject() : row;
        const { _id, whoRegion, __v, createdAt, updatedAt, ...cleanedRow } = plainRow;

        if (isNewCases == 0) {
            delete cleanedRow.newCases
        }
        if (isCulminativeCases == 0) {
            delete cleanedRow.cumulativeCases
        }
        if (isNewDeaths == 0) {
            delete cleanedRow.newDeaths
        }
        if (isCulminativeDeaths == 0) {
            delete cleanedRow.cumulativeDeaths
        }

        return replaceNullWithZero(cleanedRow)
    })

    res.send(filtered)
})

app.post('/api/transport', async (req, res) => {
    const query = models.TransportationDataModel.find({})
    query.select('')
    const data = await query.exec()

    const wyborMin = Date.parse(req.body.dateStart)
    const wyborMax = Date.parse(req.body.dateEnd)

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
        return (rok > wyborMin && rok < wyborMax)
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
})

//get all relevant (2019+) data from transport
app.get('/api/transport', async (req, res) => {
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
})

//get all from given year
app.get('/api/transport/date/:date', async (req, res) => {
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
})

export default app;