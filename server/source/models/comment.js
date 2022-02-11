import mongoose, { Schema } from 'mongoose'

const CommentModel = new Schema(
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
    postId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    score: {
      type: Object,
      default: {
        like: 0,
        unlike: 0,
      },
    },
  },
  { timestamps: true }
)

export function clearCommentModel(model) {
  delete model._doc._id
  delete model._doc.__v
  return model
}

export default mongoose.model('comment', CommentModel)
