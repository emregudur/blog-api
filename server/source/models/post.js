import mongoose, { Schema } from 'mongoose'

const PostModel = new Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  title: String,
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
  fileType: {
    type: String,
    default: 'MD',
  },
  private: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
})

export default mongoose.model('post', PostModel)
