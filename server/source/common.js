import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'

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
    { 'reg': '(?=.*[a-z])', 'err': 'req.low.character' },
    { 'reg': '(?=.*[A-Z])', 'err': 'req.upper.character' },
    { 'reg': '(?=.*[0-9])', 'err': 'req.number' },
    { 'reg': '(?=.*[!_?@#$%^&*+.,/-])', 'err': 'req.special.character' },
    { 'reg': '(?=.{8,})', 'err': 'must.be.8.character' },
  ]

  return regs
    .map(reg => {
      if (!new RegExp(reg.reg).test(password.toString())) return reg.err
    })
    .filter(x => x)
}

export const mongodbConnectionUri = () => {
  const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DBNAME, MONGO_PORT, MONGO_HOST } = process.env
  return `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`
}
