import mongoose, { Schema } from 'mongoose'

const UserModel = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    default: false,
    type: Boolean,
  },
})

export default mongoose.model('user', UserModel)
