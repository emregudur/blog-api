import mongoose, { Schema } from 'mongoose'
import { defaultProjection } from '../common'

const TagModel = new Schema(
  {
    tagId: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
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

export const tagProjection = {
  ...defaultProjection,
  userId: false,
  active: false,
}

export default mongoose.model('tags', TagModel)
