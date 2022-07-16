import mongoose from 'mongoose'
import { uri } from './common'

export default async function () {
  return new Promise((resolve, reject) => {
    mongoose.set('bufferTimeoutMS', 600000)
    // mongoose.set('useUnifiedTopology', true)
    // mongoose.set('useNewUrlParser', true)

    mongoose
      .connect(uri)
      .then(res => {
        console.log('mongodb connected')
        resolve(true)
      })
      .catch(function (err) {
        console.error(err)
        reject(err)
      })
  })
}
