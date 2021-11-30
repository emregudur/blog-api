import mongoose, { Schema } from 'mongoose'

const FileSchema = new Schema({
  filename: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  fileId: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: String,
  },
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
