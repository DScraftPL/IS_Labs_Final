import express from "express"
import cors from 'cors'
import loggingMiddleware from "./middleware/log"
import csvRoutes from "./routes/csvRoutes"
import whoRoutes from "./routes/whoRoutes"
import tranportRoutes from "./routes/transportRoutes"

import 'dotenv/config'
import connectDB from "./functions/connectDB";

const PORT = process.env.PORT
const MONGO_URI = process.env.DB_CONN_STRING
const mongoose = connectDB(MONGO_URI);

const app = express()

app.use(loggingMiddleware)
app.use(cors())
app.use(express.json())

app.use("/csv/", csvRoutes)
app.use("/api/who/", whoRoutes)
app.use("/api/transport/", tranportRoutes)

app.listen(PORT, () => {
    console.log("hello this is server, I am working on: ", PORT);
})