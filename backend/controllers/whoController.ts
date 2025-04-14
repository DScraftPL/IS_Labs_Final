import models from "../models/Schemas"
import replaceNullWithZero from "../functions/replacenullwithzero"

const get = async (req: any, res: any) => {
    const query = models.WHODataModel.find({})
    const data = await query.exec()

    const temp = data.filter((row) => row.countryCode === "US")

    const filtered = temp.map((row) => {
        const plainRow = row.toObject ? row.toObject() : row;
        const { _id, whoRegion, __v, createdAt, updatedAt, ...cleanedRow } = plainRow;
        return replaceNullWithZero(cleanedRow)
    })

    res.send(filtered)
}

const post = async (req: any, res: any) => {
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
}

const getDate = async (req: any, res: any) => {
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
}

export default {
  get,
  post,
  getDate
}