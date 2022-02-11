import mongoose, { Schema } from 'mongoose'

const ReplyModel = new Schema(
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
      required: true,
    },
    replyId: {
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
    active: {
      type: Boolean,
      default: false,
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

export function clearReplyModel(model) {
  delete model._doc._id
  delete model._doc.__v
  return model
}

export default mongoose.model('reply', ReplyModel)
