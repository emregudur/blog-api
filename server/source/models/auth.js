import mongoose, { Schema } from 'mongoose'

const Token = new Schema({
  token: String,
})

export default mongoose.model('auth', Token)
