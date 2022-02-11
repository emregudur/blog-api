import mongoose, { Schema } from 'mongoose'

const TagModel = new Schema(
  {
    tagId: {
      type: String,
      required: true,
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

export function clearTagModel(model) {
  delete model._doc._id
  delete model._doc.__v
  delete model._doc.userId
  delete model._doc.active
  return model
}

export default mongoose.model('tags', TagModel)
