import mongoose, { Schema } from 'mongoose'
import { defaultProjection } from '../common'

const PostModel = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    accessLink: {
      type: String,
      required: true,
      maxlength: 80,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 80,
      unique: true,
      index: true,
    },
    fileId: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
      required: true,
    },
    tags: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'tags',
        },
      ],
      validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
    },
    categories: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'categories',
        },
      ],
      validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
    },
    postFileMimetype: {
      type: String,
      default: 'text/markdown',
    },
    private: {
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
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

function arrayLimit(val) {
  return val.length <= 5
}

export const postProjection = {
  ...defaultProjection,
}

export default mongoose.model('post', PostModel)
