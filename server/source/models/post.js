import mongoose, { Schema } from 'mongoose'

const PostModel = new Schema({
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
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  changedAt: {
    type: Date,
    default: Date.now(),
  },
  fileId: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
    required: true,
  },
  dependentFilesStore: {
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
  active: {
    type: Boolean,
    default: true,
  },
  comments: Array,
})

export default mongoose.model('post', PostModel)
