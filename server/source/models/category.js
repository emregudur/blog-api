import mongoose, { Schema } from 'mongoose'
import { defaultProjection } from '../common'

const CategoryModel = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export const categoryProjection = {
  ...defaultProjection,
  userId: false,
  active: false,
}

export default mongoose.model('categories', CategoryModel)
