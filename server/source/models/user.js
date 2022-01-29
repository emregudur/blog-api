import mongoose, { Schema } from 'mongoose'

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

export function clearUserModel(model) {
  delete model._doc._id
  delete model._doc.__v
  delete model._doc.password
  return model
}

export default mongoose.model('user', UserModel)
