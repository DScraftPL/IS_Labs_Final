import models from "../models/Schemas"
import mapTransportationData from '../functions/mapTransportationData'
import fs from 'fs';
import path from 'path'
import csv from 'csv-parser';
import { Request, Response } from "express"


const transport = (req: Request, res: Response) => {
    const results: any[] = [];
    const csvFilePath = path.join(__dirname, '../data', 'Monthly_Transportation_Statistics_20250407.csv');

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
            const session = await models.TransportationDataModel.startSession();
            session.startTransaction();

            try {
                await models.TransportationDataModel.deleteMany({}).session(session);
                const inserted = await models.TransportationDataModel.insertMany(results, {session});
                res.json({
                    success: true,
                    count: results.length,
                    insertedCount: inserted.length,
                    sampleData: results[0]
                });
                await session.commitTransaction();
                session.endSession();
            } catch (dbError) {
                await session.abortTransaction();
                session.endSession();

                console.error('Database error:', dbError);
                res.status(500).send('Error saving data to database');
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV:', error);
            res.status(500).send('Error reading CSV file');
        });
}

const who = (req: Request, res: Response) => {
    const results: any[] = [];
    const csvFilePath = path.join(__dirname, '../data', 'WHO-COVID-19-global-data.csv')
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
            const session = await models.WHODataModel.startSession();
            session.startTransaction();
            try {
                await models.WHODataModel.deleteMany({}).session(session);
                const inserted = await models.WHODataModel.insertMany(results, {session});
                await session.commitTransaction();
                session.endSession();
                res.json({
                    success: true,
                    count: results.length,
                    insertedCount: inserted.length,
                    sampleData: results[0]
                });
            } catch (dbError) {
                await session.abortTransaction();
                session.endSession();
                console.error('Database error:', dbError);
                res.status(500).send('Error saving data to database');
            }
        })
        .on('error', (error) => {
            console.error('Error reading CSV:', error);
            res.status(500).send('Error reading CSV file');
        });
}

export default {
    transport,
    who
}