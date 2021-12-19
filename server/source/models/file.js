import mongoose, { Schema } from 'mongoose'

const FileSchema = new Schema({
  filename: {
    required: [true, 'File name required'],
    type: String,
  },
  category: {
    required: [true, 'category required'],
    type: String,
  },
  fileId: {
    required: [true, 'fileId required'],
    type: String,
  },
  userId: {
    required: [true, 'userId required'],
    type: String,
  },
  dependentPostId: String,
  createdAt: {
    default: Date.now(),
    type: Date,
  },
  ext: {
    type: String,
  },
  lastUsedDate: {
    default: Date.now(),
    type: Date,
  },
})

export default mongoose.model('File', FileSchema)
