import express from 'express'
import cookieParser from 'cookie-parser'
import setRoutes from './source/routes/index'
import connectMongo from './source/db'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Bluebird from 'bluebird'
import cors from 'cors'

const result = dotenv.config()
if (result.error) {
  throw result.error
}
connectMongo()

const app = express()
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
mongoose.Promise = Bluebird.Promise

// app.use(express.static(path.join(__dirname, 'public')));
setRoutes(app)

export default app
