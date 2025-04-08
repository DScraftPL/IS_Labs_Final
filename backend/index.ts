import express from "express"
import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'
import models from './models/Schemas'
import 'dotenv/config'
import mapTransportationData from './functions/mapTransportationData'
import connectDB from "./functions/connectDB";
import app from './routes/routes'

const PORT = process.env.PORT
const MONGO_URI = process.env.DB_CONN_STRING
const mongoose = connectDB(MONGO_URI);

app.listen(PORT, () => {
    console.log("hello this is server, I am working on: ", PORT);
})