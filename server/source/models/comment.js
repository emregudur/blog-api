import mongoose, { Schema } from 'mongoose'

const UserModel = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
      unique: true,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    reply: {
      type: Array,
    },
  },
  { timestamps: true }
)

export function clearCommentModel(model) {
  delete model._doc._id
  delete model._doc.__v
  delete model._doc.password
  return model
}

export default mongoose.model('comment', UserModel)
