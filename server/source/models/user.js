import mongoose, { Schema } from 'mongoose'
import { defaultProjection } from '../common'

const UserModel = new Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
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
    active: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
)

export const userProjection = {
  ...defaultProjection,
  password: false,
}

export default mongoose.model('user', UserModel)
