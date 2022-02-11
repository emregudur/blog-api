import mongoose, { Schema } from 'mongoose'

const CategoryModel = new Schema(
  {
    categoryId: {
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
      default: false,
    },
  },
  { timestamps: true }
)

export function clearCategoryModel(model) {
  delete model._doc._id
  delete model._doc.__v
  delete model._doc.userId
  delete model._doc.active
  return model
}

export default mongoose.model('categories', CategoryModel)
