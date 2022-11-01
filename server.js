import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./src/config/database.js";
import router from "./src/routes/routes.js";

dotenv.config()

const app = express()
app.use(cors({ credentials:true, origin: 'http//localhost:3000'}))
app.use(cookieParser())
app.use(express.json())


try {
    await db.authenticate()
    console.log('Connection has been established successfully.')
} catch (err) {
    console.error('Unable to connect to the database:', err)
}

app.use(router)
app.listen(5000, () => console.log('Server running at http://localhost:5000'))