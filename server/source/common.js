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
  const storage = new GridFsStorage({
    db: connect,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            console.log('GridFsStorage err', err)
            return reject(err)
          }
          const filename = buf.toString('hex')
          const fileInfo = {
            filename: filename,
            ext: path.extname(file.originalname).replace('.', ''),
            bucketName: 'uploads',
          }
          resolve(fileInfo)
        })
      })
    },
  })

  return multer({ storage })
}

export const gridFsStorage = () => {
  const conn = mongoose.connection
  return new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads',
  })
}

export function clearMongoData(data) {
  if (Array.isArray(data))
    return data.map(x => {
      delete x._id
      delete x.__v
      return x
    })

  delete data._id
  delete data.__v
  return data
}

export function slugify(text) {
  var trMap = {
    'çÇ': 'c',
    'ğĞ': 'g',
    'şŞ': 's',
    'üÜ': 'u',
    'ıİ': 'i',
    'öÖ': 'o',
  }
  for (var key in trMap) {
    text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key])
  }
  return text
    .replace(/[^-a-zA-Z0-9\s]+/gi, '')
    .replace(/\s/gi, '-')
    .replace(/[-]+/gi, '-')
    .toLowerCase()
}

export function getFileStoredFileds(data) {
  return data.map(({ id, filename, size, originalname, mimetype }) => {
    return { id, filename, size, originalname, mimetype }
  })
}
