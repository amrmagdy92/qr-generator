import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import compress from "compression"
import helmet from "helmet"
import cors from "cors"
import mongoose from "mongoose"
import expressRateLimiter from "express-rate-limit"

import qrRouter from "./routers/qr.route"

dotenv.config()

const app = express()

mongoose.Promise = global.Promise

mongoose.set('strictQuery', false)

mongoose.connect(process.env.DATABASE_URL, { dbName: process.env.DATABASE_NAME }).then( () => {
    console.log('Database connected successfully...')
}).catch( (err) => {
    console.log(`An error was encountered: ${err}`)
})

// TODO: Add proper configuration here
const configuredBodyParserJSON = bodyParser.json()
const configuredBodyParserURLEncoding = bodyParser.urlencoded({ extended: true })
const configuredCompress = compress()
const configuredHelmet = helmet({
    crossOriginResourcePolicy: false,
})
const configuredCors = cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})
const configuredRateLimiter = expressRateLimiter({
    window: 30*1000,
    max: 15,
    message: "You've requested this site too frequently.\nPlease wait for a while before making a new request.",
    Headers: true
})

app.use(configuredBodyParserJSON)
app.use(configuredBodyParserURLEncoding)
app.use(configuredCompress)
app.use(configuredHelmet)
app.use(configuredCors)
app.use(configuredRateLimiter)

// TODO: Add better UX for the below error handling
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({"error": `${err.name}: ${err.message}`})
    } else if (err) {
        res.status(400).json({"error": `${err.name}: ${err.message}`})
        console.log(err)
    }
})

app.get('/',(req, res) => {
    res.send("Hello")
})

app.use('/api/v1/qr', qrRouter)

export default app