import models from "../models/Schemas"
import replaceNullWithZero from "../functions/replacenullwithzero"
import { Request, Response } from "express"

const get = async (req: Request, res: Response) => {
    const session = await models.WHODataModel.startSession()
    session.startTransaction()


    const query = models.WHODataModel.find({}).session(session)
    const data = await query.exec()

    await session.commitTransaction()
    session.endSession()

    const temp = data.filter((row) => row.countryCode === "US")

    const filtered = temp.map((row) => {
        const plainRow = row.toObject ? row.toObject() : row;
        const { _id, whoRegion, __v, createdAt, updatedAt, ...cleanedRow } = plainRow;
        return replaceNullWithZero(cleanedRow)
    })

    res.send(filtered)
}

const post = async (req: Request, res: Response) => {
    const session = await models.WHODataModel.startSession()
    session.startTransaction()

    const query = models.WHODataModel.find({}).session(session)
    const data = await query.exec()

    await session.commitTransaction()
    session.endSession()

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
}

const getDate = async (req: Request, res: Response) => {
    const session = await models.WHODataModel.startSession()
    session.startTransaction()

    const query = models.WHODataModel.find({}).session(session)
    const data = await query.exec()
    
    await session.commitTransaction()
    session.endSession()
    
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
}

export default {
    get,
    post,
    getDate
}