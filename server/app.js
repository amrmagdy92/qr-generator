import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import compress from "compression"
import helmet from "helmet"
import cors from "cors"
import session from "express-session"
import memoryStorage from "memorystore"
import mongoose from "mongoose"

import qrRouter from "./routers/qr.route"

dotenv.config()

const app = express()

mongoose.Promise = global.Promise

mongoose.set('strictQuery', false)

mongoose.connect(process.env.DATABASE_URL, { dbName: process.env.DATABASE_NAME }).then( () => {
    console.log(`Database connected successfully @ ${process.env.DATABASE_URL}`)
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
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})
const memoryStore = memoryStorage(session)
const redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
})
const configuredSession = session({
    store: new memoryStore({
        checkPeriod: process.env.SESSION_CHECK_PERIOD,
        ttl: process.env.TTL,
        dispose: () => {} // TODO: dispose of database entry where session id is the key
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: process.env.SESSION_UNINITIALIZED,
    resave: false,
    cookie: {
        secure: false, // if true, only transmits cookie over https
        httpOnly: true, // if true, prevents client side js from reading the cookie
        maxAge: process.env.TTL,
        sameSite: 'lax'
    }
})

app.use(configuredBodyParserJSON)
app.use(configuredBodyParserURLEncoding)
app.use(configuredCompress)
app.use(configuredHelmet)
app.use(configuredCors)
app.use(configuredSession)

// TODO: Add better UX for the below error handling
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({"error": `${err.name}: ${err.message}`})
    } else if (err) {
        res.status(400).json({"error": `${err.name}: ${err.message}`})
        console.log(err)
    }
})

app.use('/api/v1/qr', qrRouter)

export default app