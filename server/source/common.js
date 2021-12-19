import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import mongoose from 'mongoose'
import { GridFsStorage } from 'multer-gridfs-storage'
import multer from 'multer'
import path from 'path'

import dotenv from 'dotenv'
const result = dotenv.config()
if (result.error) {
  throw result.error
}

export function encrypPassword(text) {
  return crypto.createHash('sha256').update(text).digest('hex')
}

export function generateUniqueId() {
  return uuidv4()
}

export function checkString(str) {
  if (str == null || str.trim() === '' || str === undefined) {
    return false
  }

  return true
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function securePassCheck(password) {
  let regs = [
    { 'reg': '(?=.*[a-z])', 'err': 'Required low character' },
    { 'reg': '(?=.*[A-Z])', 'err': 'Required upper character' },
    { 'reg': '(?=.*[0-9])', 'err': 'Required number' },
    { 'reg': '(?=.*[!_?@#$%^&*+.,/-])', 'err': 'Required special character' },
    { 'reg': '(?=.{8,})', 'err': 'Must be 8 character' },
  ]

  return regs
    .map(reg => {
      if (!new RegExp(reg.reg).test(password.toString())) return reg.err
    })
    .filter(x => x)
}

export const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}?authSource=admin`

export const handleErrors = err => {
  // TODO: save error
  console.log(err)
  return { status: false, message: "There's something wrong", err }
}

export const upload = () => {
  const connect = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  const conn = mongoose.connection
  let gfs

  conn.once('open', () => {
    // initialize stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    })
  })

  const storage = new GridFsStorage({
    db: connect,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            console.log('GridFsStorage err', err)
            return reject(err)
          }
          const filename = buf.toString('hex') + path.extname(file.originalname)
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          }
          resolve(fileInfo)
        })
      })
    },
  })

  return [multer({ storage }), gfs]
}
