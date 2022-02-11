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
    dependentFiles: {
      type: Array,
    },
    tags: {
      type: Array,
    },
    categories: {
      type: Array,
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

export const postProjection = {
  ...defaultProjection,
  dependentFiles: false,
}

export default mongoose.model('post', PostModel)
