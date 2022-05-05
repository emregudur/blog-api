import express from 'express'
import cookieParser from 'cookie-parser'
import setRoutes from './source/routes/index'
import connectMongo from './source/db'
import mongoose from 'mongoose'
import Bluebird from 'bluebird'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.Promise = Bluebird.Promise

// app.use(express.static(path.join(__dirname, 'public')));
connectMongo().then(x => setRoutes(app))

export default app
