import mongoose, { Schema } from 'mongoose'

const PostModel = new Schema({
  userId: String,
  title: String,
  date: String,
  fileId: String,
  postImage: String,
  fileType: String,
})

export default mongoose.model('post', PostModel)
