import 'dotenv/config'
import connectDB from "./functions/connectDB";
import app from './routes/routes'


const PORT = process.env.PORT
const MONGO_URI = process.env.DB_CONN_STRING
const mongoose = connectDB(MONGO_URI);

app.listen(PORT, () => {
    console.log("hello this is server, I am working on: ", PORT);
})