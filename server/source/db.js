import mongoose from 'mongoose'
import { uri } from './common'

export default async function () {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(res => {
        console.log('mongodb connected')
        resolve(true)
      })
      .catch(function (err) {
        console.log(err)
        reject(err)
      })
  })
}
