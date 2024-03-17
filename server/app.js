import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import compress from "compression"
import helmet from "helmet"
import cors from "cors"
import session from "express-session"
import memoryStorage from "memorystore"
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
    origin: 'https://amrmagdy92.github.io/qr-generation/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
})
const memoryStore = memoryStorage(session)
const configuredSession = session({
    store: new memoryStore({
        checkPeriod: Number(process.env.SESSION_CHECK_PERIOD),
        ttl: Number(process.env.TTL),
        dispose: () => {} // TODO: dispose of database entry where session id is the key
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: process.env.SESSION_UNINITIALIZED,
    resave: true,
    cookie: {
        // secure: false, // if true, only transmits cookie over https
        httpOnly: true, // if true, prevents client side js from reading the cookie
        maxAge: Number(process.env.TTL),
        sameSite: 'lax'
    }
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
app.use(configuredSession)
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